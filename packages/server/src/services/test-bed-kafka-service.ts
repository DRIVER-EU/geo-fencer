import { Query } from '@nestjs/common';
import { EventEmitter } from 'events';
import { TestBedAdapter, Logger, LogLevel, IAdapterMessage, ProduceRequest } from 'node-test-bed-adapter';
import { geoFencerDef } from './../testdata/testdata';
import { RuleFired } from './../models/rest/rest-models';

import * as amberAlert from './../testdata/amber.json';
import { namedGeojsonToAvro } from './../utils/avro';
import { TaskQueue } from 'typescript-task-queue';

// Services:
import { IConfigService, ITopicNames } from './config-service';
import { ILogService } from './log-service';

// AVRO kafka schema's
import { IItem } from './../models/avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';
import { IObjectDeleted } from './../models/avro_generated/eu/driver/model/sim/simulation_object_deleted-value';
import { IGeoJSONEnvelope, IFeatureCollection } from './../models/avro_generated/eu/driver/model/geojson/standard_named_geojson-value';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';

import { NamedGeoJsonProcessor } from './../utils/namedGeoJsonProcessor';

/*
https://github.com/that-coder/kafka-example

The TestBedKafkaService connects to the KAFKA bus and listen on the 'Item' and 'GeoFencer' topics
It uses the node.js eu-driver implementation for this: https://github.com/DRIVER-EU/node-test-bed-adapter

Subscribe to topics:
- Simulation 'Item' messages
- Geofencer definitions message
Publish to topics:
- Geofencer trigger messages

*/

// Configuration settings for this service
export interface ITestBedAdapterSettings {
  kafkaHost: string;
  schemaRegistryUrl: string;
  autoRegisterSchemas: boolean;
  kafkaClientId: string;
  schemaFolder: string;

}

export interface ITestBedKafkaService {
  // Fires when a simulator 'Item' is published (by external party) on KAFKA bus (created or updated)
  on(event: 'SimulationItemMsg', listener: (simItem: IItem) => void): this;
  // Fires when a simulator 'Item' is removed from KAFKA bus (by external party)
  on(event: 'ObjectDeletedMsg', listener: (simItem: IObjectDeleted) => void): this;
  // Fired when a GeoFencerDefinitionMsg is published (by external party) on KAFKA bus.
  on(event: 'GeoFencerDefinitionMsg', listener: (geoFencerDefinition: IGeoJSONEnvelope) => void): this;

  ConnectToKafka(): void;
  GenerateTestMessages(): void;
  SubscribedTopics: String;
  PublishRuleFired(topicInfo: RuleFired): void;
  PublishGeofencerDefinition(definition: IGeoJSONEnvelope): void;
  PublishSimItems(simItems: IItem[]): void;
  settings: ITestBedAdapterSettings;
  isConnectedToKafka: boolean;
}

export class TestBedKafkaService extends EventEmitter implements ITestBedKafkaService {

  private kafkaSettings: ITestBedAdapterSettings;
  private topicNames: ITopicNames;
  private adapter: TestBedAdapter;
  private log = Logger.instance;
  private delayedPublish: TaskQueue = new TaskQueue();
  private connectedToKafka: boolean = false;

  constructor(
    private logService: ILogService,
    private configService: IConfigService) {
    super();


    this.kafkaSettings = this.configService.GetKafkaSettings();
    this.topicNames = this.configService.GetTopicnames();
    this.kafkaSettings.autoRegisterSchemas = true; // bypass config; debug

    logService.LogMessage(`KAFA setting: Host=${this.kafkaSettings.kafkaHost} Registry=${this.kafkaSettings.schemaRegistryUrl} `);
	logService.LogMessage(`Kafka schema folder ${this.kafkaSettings.schemaFolder}`);
    logService.LogMessage('KAFKA Topics');
    logService.LogMessage(`- Sim topic: ${this.topicNames.SimulationItemTopic}`);
    logService.LogMessage(`- Sim topic delete: ${this.topicNames.SimItemDeleted}`);
    logService.LogMessage(`- Geofencer definition: ${this.topicNames.GeoFencerDefinition}`);
    logService.LogMessage(`- Geofencer notification: ${this.topicNames.RuleFired}`);

    // The topic name is mapped to the AVRO schema based on a naming convention (e.g. standard_named_geojson -> standard_named_geojson-value.json)
    // When a topic is mapped to a avro schema manual, it looks lik the node.js adapter doesn't use the correct serialiser / deserializer
    this.adapter = new TestBedAdapter({
      kafkaHost: this.kafkaSettings.kafkaHost,
      schemaRegistry: this.kafkaSettings.schemaRegistryUrl,
      fetchAllSchemas: false,
      fetchAllVersions: false,
      wrapUnions: 'auto',
      clientId: this.kafkaSettings.kafkaClientId,
      autoRegisterSchemas: this.kafkaSettings.autoRegisterSchemas,
      // All the schema's in this folder are registered with the filename as topicname (without -value).
      // Normally this would be done by test-bed-admin tool
      schemaFolder: this.kafkaSettings.schemaFolder,
      fromOffset: false /* for all consumers: dont get previous messages from KAFKA */,
      consume: [
        { topic: this.topicNames.SimulationItemTopic },
        { topic: this.topicNames.SimItemDeleted },
        { topic: this.topicNames.RuleFired },
        { topic: this.topicNames.GeoFencerDefinition },
      ],
      produce: [
        this.topicNames.SimulationItemTopic,
        this.topicNames.SimItemDeleted,
        this.topicNames.RuleFired,
        this.topicNames.GeoFencerDefinition
      ],
      logging: {
        logToConsole: LogLevel.Info,
        logToKafka: LogLevel.Warn,
      },
    });

    this.adapter.on('ready', () => {
      this.log.info(`Connected to Kafka Server '${this.kafkaSettings.kafkaHost}'. `);
      this.logService.LogMessage('Start publishing messages to KAFKA');
      this.connectedToKafka = true;
      this.delayedPublish.start();
    });

    this.adapter.on('error', e => {
      logService.LogErrorMessage(`Kafka adapter error: ${e}.`);
    });
    this.adapter.on('message', (message) => this.HandleMessage(message));
    this.adapter.on('offsetOutOfRange', (err) => logService.LogErrorMessage(`Consumer received an offsetOutOfRange error: ${err}`));

  }

  public get isConnectedToKafka(): boolean {
    return this.connectedToKafka;
  }

  public ConnectToKafka(): void {
    this.adapter.connect();
  }

  public get settings() {
    return this.kafkaSettings;
  }

  public GenerateTestMessages(): void {
    // const json = JSON.stringify(geoFencerDef);
    // this.emit('GeoFencerDefinitionMsg', geoFencerDef);
  }

  private HandleMessage(message: IAdapterMessage) {
    // const stringify = (m: string | Object) => typeof m === 'string' ? m : JSON.stringify(m, null, 2);
    // this.logService.LogMessage(`Received  ${stringify(message.key)}: ${stringify(message.value)}`);
    try {
      // Check topic name:
      switch (message.topic) {
        case this.topicNames.GeoFencerDefinition:
          // GeoFencer definition (wrapped in GeoJSON)
          const geoJsonMsg: IGeoJSONEnvelope | null = NamedGeoJsonProcessor.fixParseErrors(message.value);
          this.emit('GeoFencerDefinitionMsg', geoJsonMsg as IGeoJSONEnvelope);
          break;
        case this.topicNames.SimulationItemTopic:
          // Simulation Item created or updated
          this.emit('SimulationItemMsg', message.value as IItem);
          break;
        case this.topicNames.SimItemDeleted:
          // Simulation Item deleted
          this.emit('ObjectDeletedMsg', message.value as IObjectDeleted);
          break;
        default:
          this.logService.LogMessage(`Received unknown topic '${message.topic}' from kafka bus.`);
          break;
      }
    } catch (error) {
        this.logService.LogErrorMessage(`Exception when handling topic '${message.topic}' from kafka bus.`, error);
    }
  }

  public get SubscribedTopics() {
    return '';
  }

  public PublishRuleFired(topicInfo: RuleFired): void {
    // Publish only when connected to KAFKA
    if (this.connectedToKafka) this.DelayedPublishRuleFired(topicInfo);
    else this.delayedPublish.enqueue(() => { this.DelayedPublishRuleFired(topicInfo); });
  }

  private DelayedPublishRuleFired(topicInfo: RuleFired) {
    const payloads: ProduceRequest[] = [
      {
        topic: this.topicNames.RuleFired,
        messages: topicInfo,
        attributes: 1, // Gzip
      },
    ];
    this.logService.LogMessage(`Try to publish rule fired messages to KAFKA on topic ${this.topicNames.RuleFired}`);
    // When publishing the message on KAFKA the message will do a roundtrip (will also be received by this service)
    this.adapter.send(payloads, (error, data) => {
      debugger;
      if (error) {
        this.logService.LogErrorMessage(`Failed to publish rule fired to KAFKA on topic ${this.topicNames.RuleFired}, error: ${error}`);
      } else {
        this.logService.LogMessage(`Published rule fired to KAFKA on topic ${this.topicNames.RuleFired}`);
      }
    });
  }

  public PublishSimItems(simItems: IItem[]): void {
    // Publish only when connected to KAFKA
    if (this.connectedToKafka) this.DelayedPublishSimItems(simItems);
    else this.delayedPublish.enqueue(() => { this.DelayedPublishSimItems(simItems); });
  }

  private DelayedPublishSimItems(simItems: IItem[]) {
    const payloads: ProduceRequest[] = [
      {
        topic: this.topicNames.SimulationItemTopic,
        messages: simItems[0],
        attributes: 1, // Gzip
      },
    ];
    this.logService.LogMessage(`Try to publish simulation items messages to KAFKA on topic ${this.topicNames.SimulationItemTopic}`);
    // When publishing the message on KAFKA the message will do a roundtrip (will also be received by this service)
    this.adapter.send(payloads, (error, data) => {
      debugger;
      if (error) {
        this.logService.LogErrorMessage(`Failed to publish sim. items to KAFKA on topic ${this.topicNames.SimulationItemTopic}, error: ${error}`);
      } else {
        this.logService.LogMessage(`Published sim items to KAFKA on topic ${this.topicNames.SimulationItemTopic}`);
      }
    });
  }

  public PublishGeofencerDefinition(definition: IGeoJSONEnvelope): void {
    // Publish only when connected to KAFKA
    if (this.connectedToKafka) this.DelayedPublishGeofencerDefinition(definition);
    else this.delayedPublish.enqueue(() => { this.DelayedPublishGeofencerDefinition(definition); });
  }

  private DelayedPublishGeofencerDefinition(definition: IGeoJSONEnvelope): void {
    const geojson = namedGeojsonToAvro(definition);
    const payloads: ProduceRequest[] = [
      {
        topic: this.topicNames.GeoFencerDefinition,
        messages: geojson, // definition,
        attributes: 1, // Gzip
      },
    ];
    this.logService.LogMessage(`Try to publish geofencer definition to KAFKA on topic ${this.topicNames.GeoFencerDefinition}`);
    // When publishing the message on KAFKA the message will do a roundtrip (will also be received by this service)
    this.adapter.send(payloads, (error, data) => {
      debugger;
      if (error) {
        this.logService.LogErrorMessage(`Failed to publish geofencer definition to KAFKA on topic ${this.topicNames.GeoFencerDefinition}, error: ${error}`);
      } else {
        this.logService.LogMessage(`Published geofencer definition to KAFKA on topic ${this.topicNames.GeoFencerDefinition}`);
      }
    });
  }
}
