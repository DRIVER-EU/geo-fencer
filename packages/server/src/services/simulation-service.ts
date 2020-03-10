import { IItem } from './../models/avro_generated/eu/driver/model/sim/entity/simulation_entity_item-value';
import { EventEmitter } from 'events';

import { Logger } from 'node-test-bed-adapter';

import { ITestBedKafkaService } from './test-bed-kafka-service';


import { IEntityDeleted } from './../models/avro_generated/eu/driver/model/sim/support/simulation_entity_deleted-value';
import { IConfigService } from './config-service';
import { ILogService } from './log-service';



/**
 * Service provides the simulation items
 *
 * Handles the simulation item messages from the kafka service.
 * The service notify when the simulator items collection changes and items can be looked up
 *
 * The simulator item list is for debug purpose
 *
 * TODO:
 * - Clear list on 'Start Scenario Event'?
 * - In the future create a seperate standalone service (method by REST and events by websocket)
 */
export interface ISimulationService {
  // Events fired when simulator items collection changes
  on(event: 'newSimulationItem', listener: (Guid: string, simItem: IItem) => void): this;
  on(event: 'updateSimulationItem', listener: (Guid: string, simItem: IItem, oldSimItem: IItem) => void): this;
  on(event: 'deleteSimulationItem', listener: (Guid: string) => void): this;

  InjectTestData(items: IItem[]): void;
}

//
export class SimulationService extends EventEmitter implements ISimulationService {
  // Dictionary with all simulation items received from KAFKA
  private simulationItems = new Map<string, IItem>();

  private log = Logger.instance;
  constructor(
    private logService: ILogService,
    private configService: IConfigService,
    private kafkaService: ITestBedKafkaService) {
    super();
    this.assignKafkaService(kafkaService);
  }

  private assignKafkaService(service: ITestBedKafkaService): void {
    this.kafkaService = service;
    this.kafkaService.on('SimulationItemMsg', (simObj) => this.onSimulationItemTopic(simObj));
    this.kafkaService.on('ObjectDeletedMsg', (delObj) => this.onObjectDeleted(delObj));
  }

  private onObjectDeleted(simItem: IEntityDeleted): void {
    if (!simItem.id) {
      this.logService.LogErrorMessage('Received simulation item without GUID, skip simualtion item.');
      return;
    }
    this.emit('deleteSimulationItem', simItem.id);
    this.simulationItems.delete(simItem.id);
  }

  private onSimulationItemTopic(simItem: IItem): void {
    if (!simItem.id) {
      this.logService.LogErrorMessage('Received simulation item without ID, skip simualtion item.');
      return;
    }
    // Lookup simulation entity
    const oldSimulationItem = this.simulationItems.get(simItem.id);
    if (oldSimulationItem) {
      // Update on simulation item
      this.emit('updateSimulationItem', simItem.id, simItem, oldSimulationItem);
    } else {
      // New simulation item
      this.emit('newSimulationItem', simItem.id, simItem);
    }
    this.simulationItems.set(simItem.id, simItem);
  }

  public InjectTestData(items: IItem[]) {
    items.forEach(x => this.onSimulationItemTopic(x));
  }
}
