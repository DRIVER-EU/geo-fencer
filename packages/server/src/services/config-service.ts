
import { EventEmitter } from 'events';
import { ITestBedAdapterSettings } from './test-bed-kafka-service'

/* 

Service to get all configuration.

The package https://www.npmjs.com/package/nconf is used for this.

*/

const nconf = require('nconf');

// Topic names used
export interface ITopicNames {
    SimulationItemTopicOther : string,
    SimulationItemTopicBlue : string,
    SimulationItemTopicRed : string,
    SimulationItemTopicWhite : string,
    SimItemDeleted : string,
    GeoFencerDefinition : string
}

export interface IConfigService {
    
    GetTopicnames() : ITopicNames
    GetKafkaSettings(): ITestBedAdapterSettings;
    GetNestServerPortNumber() : number;
}

export class ConfigService extends EventEmitter implements IConfigService {

   
    constructor() {
        super();
       
        // Setup nconf to use (in-order):
        //   1. Command-line arguments
        //   2. Environment variables
        //   3. A file located at './geofencer-config.json'

        const cfgFile = `${process.cwd()}\\packages\\server\\geofencer-config.json`;
        const cfgTopicnamesFile = `${process.cwd()}\\packages\\server\\geofencer-topicnames-config.json`;
        console.log(`Use configuration file '${cfgFile}'.`);
        nconf
        .argv()
        .env()
        .file({ file: cfgFile })
        .file({ file: cfgTopicnamesFile })
        .defaults({
            'kafka:clientid': "example"
        });
        
    }

    GetNestServerPortNumber() : number {
        return nconf.get('ServerPort') || 7890;
    }

    GetKafkaSettings(): ITestBedAdapterSettings {
        var result: ITestBedAdapterSettings =
        {
            kafkaHost:  nconf.get('kafka:kafkaHost') || "localhost:3501",
            schemaRegistryUrl: nconf.get('kafka:schemaRegistryUrl') || "localhost:3502",
            autoRegisterSchemas: nconf.get('kafka:autoRegisterSchemas') || false,
            kafkaClientId: nconf.get('kafka:clientid') || "GeoFencerService"
        };
        return result;
    }

    // Topic names used in this GeoFencer service
    GetTopicnames() : ITopicNames {
        var result: ITopicNames =
        {
            SimItemDeleted:  nconf.get('SimItemDeleted') || "simulation_entity_item-deleted",
            SimulationItemTopicOther:  nconf.get('SimItemOther') || "simulation_entity_item-other",
            SimulationItemTopicBlue:  nconf.get('SimItemBlue') || "simulation_entity_item-blue",
            SimulationItemTopicRed:  nconf.get('SimItemRed') || "simulation_entity_item-red",
            SimulationItemTopicWhite:  nconf.get('SimItemWhite') || "simulation_entity_item-white",
            GeoFencerDefinition :  nconf.get('GeoFencerDefinition') || "geo-fencer-definition",
        };
        return result;
    }

}
