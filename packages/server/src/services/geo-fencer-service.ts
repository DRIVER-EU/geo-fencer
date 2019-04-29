;

import { TriggerArea } from './../models/geofencer/TriggerArea';
import { EventEmitter } from 'events';
import { RuleFired } from './../models/rest/rest-models'
import { ItemInterface, Item } from './../models/avro/eu/driver/model/sim/entity/Item'
import { GeoJSONEnvelopeInterface } from './../models/avro/eu/driver/model/geojson/GeoJSONEnvelope'
import { GeoFencerDefinition } from '../models/geofencer/GeoFencerDefinition'

// Services:
import { IConfigService } from './config-service';
import { ILogService } from './log-service';
import { ISimulationService } from './simulation-service';
import { ITestBedKafkaService } from './test-bed-kafka-service'

var turf = require('@turf/turf');

/*

The GeoFencer service monitors all Simulator Items and validate them against all rules (triggerAreas).
All state changes are reported

*/

export interface IGeoFencerService {
  GeoFencerDefintions: GeoFencerDefinition[];
  LoadGeofencerRule(definition : GeoJSONEnvelopeInterface) : void;
  GetRule(triggerAreaId: string): TriggerArea | undefined | null;

  // Fires when Sim item state changed
  on(event: 'stateChangeSimulationItem', listener: (ruleTrigger: RuleFired) => void): this;
}

export class GeoFencerService extends EventEmitter implements IGeoFencerService {

  // For now always one geo fencer defintions
  private geoFencerDefintions: GeoFencerDefinition[] = [];

  constructor(
    private logService: ILogService,
    private configService: IConfigService,
    private simulationService: ISimulationService,
    private kafkaService: ITestBedKafkaService) {

    super();
    this.SubscribeToServices();
  }

  // Subscribe to all changes from the Simulation Service
  private SubscribeToServices() {
    this.simulationService.on('newSimulationItem', (guid, simObj) => this.onNewSimulationItem(guid, simObj));
    this.simulationService.on('updateSimulationItem', (guid, simObj, oldSimObj) => this.onUpdateSimulationItem(guid, simObj, oldSimObj));
    this.simulationService.on('deleteSimulationItem', (guid) => this.onDeleteSimulationItem(guid));
    this.kafkaService.on('GeoFencerDefinitionMsg', (geoFencerDefinition) => this.onGeoFencerDefinition(geoFencerDefinition));
  }

  /**
   * Received a new or update simulation item 
   * @param guid Unqiue number for simulation item
   * @param simItem The simulation object 
   */
  private onNewSimulationItem(guid: String, simItem: ItemInterface) {
    this.logService.LogMessage(`Received new simulation object: ${guid}`);
    this.ValidateAgainstAllRules(simItem);
  }

  /**
 * Received a new or update simulation item from KAFKA bus
 * @param guid Unqiue number for simulation item
 * @param simItem The simulation object 
 * @param oldSimItem The simulation object before the update
 */
  private onUpdateSimulationItem(guid: String, simItem: ItemInterface, oldSimItem: ItemInterface) {
    this.logService.LogMessage(`Received update simulation object: ${guid}`);
    this.ValidateAgainstAllRules(simItem);
  }

  /**
* Simulation item is deleted 
* @param guid Unqiue number for simulation item
*/
  private onDeleteSimulationItem(guid: string) {
    this.logService.LogMessage(`Deleted simulation object: ${guid}`);
    this.geoFencerDefintions.forEach((geoFencerDef: GeoFencerDefinition) => {
      geoFencerDef.SimulationItemDeleted(guid);
    });
  }


  /**
   * Add Geo Fencer defintion
   */
  private onGeoFencerDefinition(definition: GeoJSONEnvelopeInterface) {
    this.LoadGeofencerRule(definition);
  }

  public LoadGeofencerRule(definition : GeoJSONEnvelopeInterface) {
// For now reset the list (only one definition)
    // This will instantiate the AST rule validation
    this.logService.LogMessage(`Load geofencer definition.`);
    this.geoFencerDefintions = [new GeoFencerDefinition(this.logService, definition)];
    
  }

  private ValidateAgainstAllRules(simItem: ItemInterface, isTestData = false) {
    this.geoFencerDefintions.forEach((geoFencerDef: GeoFencerDefinition) => {
      geoFencerDef.ValidateAgainstAllRules(simItem,
        {
          // Only called on change
          OnChangeTrigger: (rule: TriggerArea, simItem: ItemInterface, hit: boolean, initial: boolean) => {
            if (initial) {
              this.logService.LogMessage(`Rule ${rule.TriggerAreaId}: Simulator item ${simItem.guid || ""} ${hit ? " has match" : "has no match"} `);
            } else {
              this.logService.LogMessage(`Rule ${rule.TriggerAreaId}: Simulator item ${simItem.guid || ""} ${hit ? " changed to has match" : " changed to has no match"} `);
            }
            if ((hit) || (!hit && !initial)) {
              const fireInfo = new RuleFired(rule.TriggerAreaId, simItem.guid, hit, initial);
              this.kafkaService.Publish(fireInfo);
              this.emit('stateChangeSimulationItem', fireInfo);
            } 
          }
        }, isTestData);
    });
  }

  get GeoFencerDefintions(): GeoFencerDefinition[] {
    return this.geoFencerDefintions;
  }

  // Find rule recursive by (computer generated) ID
  public GetRule(triggerAreaId: string): TriggerArea | undefined | null {
    const result = this.geoFencerDefintions
      .map(x => x.triggerAreas)
      .reduce((pn, u) => [...pn, ...u], [])
      .filter(x => x.RuntimeUniqueID === triggerAreaId)[0];
    return result;
  }
}
