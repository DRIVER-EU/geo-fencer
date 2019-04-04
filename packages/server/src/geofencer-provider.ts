import { ILogService, LogService } from "./services/log-service";
import { IConfigService, ConfigService } from "./services/config-service";
import { ISimulationService, SimulationService } from "./services/simulation-service";
import { IGeoFencerService, GeoFencerService } from "./services/geo-fencer-service";
import { ITestBedKafkaService, TestBedKafkaService } from "./services/test-bed-kafka-service";

/*

The GeofencerProvider creates all services (all services are event driven).
- kafkaTestBedService: handles all KAFKA messages
- simulationService: manages all simulation 'Item' on KAFKA bus 
- configService: all settings used in this server (combined from file / commandline and environment )
- logService: central point for logging 
- geoFencerService: the service for monitoring simulator 'Item' and notifiy when triggers are hit

*/

export class GeofencerProvider {
    private logService: ILogService;
    private configService: IConfigService;
    private simulationService: ISimulationService;
    private geoFencerService: IGeoFencerService;
    private kafkaTestBedService: ITestBedKafkaService;

    constructor() {
        console.log("Constructor GeofencerProvider");

        // Setup services:
        this.logService = new LogService();
        this.configService = new ConfigService();
        this.kafkaTestBedService = new TestBedKafkaService(this.logService, this.configService);
        this.simulationService = new SimulationService(this.logService, this.configService, this.kafkaTestBedService); // Manage Simulation Item 
        this.geoFencerService = new GeoFencerService(this.logService, this.configService, this.simulationService, this.kafkaTestBedService);

        //this.kafkaTestBedService.ConnectToKafka();
        this.kafkaTestBedService.GenerateTestMessages();

    }

    get LogService() {
        return this.logService;
    }

    get ConfigService() {
        return this.configService;
    }

    get TestBedKafkaService() {
        return this.kafkaTestBedService;
    }

    get GeoFencerService() {
        return this.geoFencerService;
    }

    get SimulationService() {
        return this.simulationService;
    }

}