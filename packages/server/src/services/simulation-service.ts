import { ItemInterface } from './../models/avro/eu/driver/model/sim/entity/Item';
import { EventEmitter } from 'events';

import { Logger } from 'node-test-bed-adapter';

import { ITestBedKafkaService }  from './test-bed-kafka-service';


import { ObjectDeletedInterface } from './../models/avro/eu/driver/model/sim/ObjectDeleted';
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
   on(event: 'newSimulationItem', listener: (Guid: string, simItem: ItemInterface) => void): this;
   on(event: 'updateSimulationItem', listener: (Guid: string, simItem: ItemInterface, oldSimItem: ItemInterface) => void): this;
   on(event: 'deleteSimulationItem', listener: (Guid: string) => void): this;

   InjectTestData(items: ItemInterface[]): void;
}

//
export class SimulationService extends EventEmitter implements ISimulationService {
    // Dictionary with all simulation items received from KAFKA
    private simulationItems = new Map<string, ItemInterface>();

    private log = Logger.instance;
  constructor(
    private logService: ILogService,
    private configService:  IConfigService,
    private kafkaService: ITestBedKafkaService) {
    super();
    this.assignKafkaService(kafkaService);
  }

  private assignKafkaService(service: ITestBedKafkaService): void {
    this.kafkaService = service;
    this.kafkaService.on('SimulationItemMsg', (simObj) => this.onSimulationItemTopic(simObj));
    this.kafkaService.on('ObjectDeletedMsg', (delObj) => this.onObjectDeleted(delObj));
  }

  private onObjectDeleted(simItem: ObjectDeletedInterface): void {
      this.emit('deleteSimulationItem', simItem.guid);
      this.simulationItems.delete(simItem.guid);
  }

  private onSimulationItemTopic(simItem: ItemInterface): void {
      // Lookup simulation entity
      const oldSimulationItem = this.simulationItems.get(simItem.guid);
      if (oldSimulationItem) {
        // Update on simulation item
        this.emit('updateSimulationItem', simItem.guid, simItem, oldSimulationItem);
      } else {
        // New simulation item
        this.emit('newSimulationItem', simItem.guid, simItem);
      }
      this.simulationItems.set( simItem.guid, simItem);
  }

  public InjectTestData(items: ItemInterface[]) {
    items.forEach(x => this.onSimulationItemTopic(x));
  }
}
