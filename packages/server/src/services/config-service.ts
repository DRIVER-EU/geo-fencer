
import { EventEmitter } from 'events';
import { ITestBedAdapterSettings } from './test-bed-kafka-service'


/* 

Service to get all configuration.

The package https://www.npmjs.com/package/nconf is used for this.

*/
const Path = require('path');
const nconf = require('nconf');
const Yargs = require('yargs');
const fs = require('fs')

// const CONFIG_DIR = Path.join(__dirname, '../config');

// Topic names used
export interface ITopicNames {
    SimulationItemTopicOther : string,
    SimulationItemTopicBlue : string,
    SimulationItemTopicRed : string,
    SimulationItemTopicWhite : string,
    SimItemDeleted : string,
    GeoFencerDefinition : string,
    RuleFired : string
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

        // Path.join(__dirname, '../config');
        //const cfgFileName= "geofencer-config.json";
        const cfgFileName= "geofencer-config.json";
        
        const cfgTopicnamesFile = `${process.cwd()}\\geofencer-topicnames-config.json`;
        
        nconf
        .argv({
            "c": {
              alias: 'config',
              describe: 'Set configuration file',
              demand: false,
              default: cfgFileName,
              parseValues: true,
              transform: function(obj : any) {
                return obj;
              }
            }
          })
        .env()
        .file('generic', { file: `${process.cwd()}\\${nconf.get('config')}` })
        .file('topics', { file: cfgTopicnamesFile })
        .defaults({
            'kafka:clientid': "example"
        });
       
        const cfgFile = `${process.cwd()}\\${nconf.get('config')}`;
        console.log(`Use configuration file '${cfgFile}'.`);

        try {
            if (!fs.existsSync(cfgFile)) console.error("Configuration file not found.");
          } catch(err) {
            
          }


        // Set general CLI options
    let yargs = Yargs
    .usage('Usage: npm run start:prod ')
    .example('npm run start:prod --config geofencer-config-custom.json', 'Use non default config file.')
    .help('h')
    .alias('h', 'help')
    .epilog('Driver-eu')
    .argv;
      
    

    }

    GetNestServerPortNumber() : number {
        return nconf.get('server:port') || 7890;
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
            RuleFired:  nconf.get('RuleFired') || "rule-fired"
        };
        return result;
    }

}
