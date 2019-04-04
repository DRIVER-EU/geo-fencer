import { EventEmitter } from 'events';
import { TestBedAdapter, Logger, LogLevel, IAdapterMessage } from 'node-test-bed-adapter';
import { geoFencerDef, testItemData, testItemData1 } from './../testdata/testdata'

// Services: 
import { IConfigService, ITopicNames } from './config-service';
import { ILogService } from './log-service';

// AVRO kafka schema's
import { ItemInterface } from './../models/avro/eu/driver/model/sim/entity/Item';
import { ObjectDeletedInterface } from './../models/avro/eu/driver/model/sim/ObjectDeleted';
import { GeoJSONEnvelopeInterface } from './../models/avro/eu/driver/model/geojson/GeoJSONEnvelope';

/* 
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
}

export interface ITestBedKafkaService {
  // Fires when a simulator 'Item' is published (by external party) on KAFKA bus (created or updated)
  on(event: 'SimulationItemMsg', listener: (simItem: ItemInterface) => void): this;
  // Fires when a simulator 'Item' is removed from KAFKA bus (by external party)
  on(event: 'ObjectDeletedMsg', listener: (simItem: ObjectDeletedInterface) => void): this;
  // Fired when a GeoFencerDefinitionMsg is published (by external party) on KAFKA bus.
  on(event: 'GeoFencerDefinitionMsg', listener: (geoFencerDefinition: GeoJSONEnvelopeInterface) => void): this;

  ConnectToKafka() : void;
  GenerateTestMessages() : void;
}

export class TestBedKafkaService extends EventEmitter implements ITestBedKafkaService {

  private kafkaSettings: ITestBedAdapterSettings;
  private topicNames: ITopicNames;
  private adapter: TestBedAdapter;
  private log = Logger.instance;

  constructor(
    private logService: ILogService,
    private configService: IConfigService) {
    super();


    this.kafkaSettings = this.configService.GetKafkaSettings();
    this.topicNames = this.configService.GetTopicnames();
    this.kafkaSettings.autoRegisterSchemas = true; // bypass config; debug

    this.adapter = new TestBedAdapter({
      kafkaHost: this.kafkaSettings.kafkaHost,
      schemaRegistry: this.kafkaSettings.schemaRegistryUrl,
      fetchAllSchemas: false,
      clientId: this.kafkaSettings.kafkaClientId,
      autoRegisterSchemas: this.kafkaSettings.autoRegisterSchemas,
      schemaFolder: 'schemas',
      consume: [
        { topic: this.topicNames.SimulationItemTopicOther },
        // { topic: this.topicNames.SimulationItemTopicRed },
        //  { topic: this.topicNames.SimulationItemTopicBlue },
        //  { topic: this.topicNames.SimulationItemTopicWhite }
      ],
      produce: [this.topicNames.SimulationItemTopicOther],
      logging: {
        logToConsole: LogLevel.Info,
        logToKafka: LogLevel.Warn,
      },
    });

    this.adapter.on('ready', () => {
      this.log.info(`Connected to Kafka Server '${this.kafkaSettings.kafkaHost}'. `);
      this.adapter.on('message', (message) => this.HandleMessage(message));
      this.adapter.on('error', (err) => this.log.error(`Consumer received an error: ${err}`));
      this.adapter.on('offsetOutOfRange', (err) => this.log.error(`Consumer received an offsetOutOfRange error: ${err}`));
    });
  }

  public ConnectToKafka() : void {
    this.adapter.connect();
  }


  public GenerateTestMessages() : void {
    const json = JSON.stringify(geoFencerDef);
    this.emit("GeoFencerDefinitionMsg", geoFencerDef);
  }

  private HandleMessage(message: IAdapterMessage) {
    const stringify = (m: string | Object) => typeof m === 'string' ? m : JSON.stringify(m, null, 2);
    this.logService.LogMessage(`Received  ${stringify(message.key)}: ${stringify(message.value)}`);

    // Check topic name:
    switch (message.topic) {
      case this.topicNames.GeoFencerDefinition:
        // GeoFencer definition (wrapped in GeoJSON)
        this.emit("GeoFencerDefinitionMsg", message.value as GeoJSONEnvelopeInterface);
        break;
      case this.topicNames.SimulationItemTopicOther:
      case this.topicNames.SimulationItemTopicBlue:
      case this.topicNames.SimulationItemTopicRed:
      case this.topicNames.SimulationItemTopicWhite:
        // Simulation Item created or updated
        this.emit("SimulationItemMsg", message.value as ItemInterface);
        break;
      case this.topicNames.SimItemDeleted:
        // Simulation Item deleted
        this.emit("ObjectDeletedMsg", message.value as ObjectDeletedInterface);
        break;
      default:
         this.logService.LogMessage(`Unknown topic {message.topic} in kafka bus.`);
        break;
    }
  }
}
