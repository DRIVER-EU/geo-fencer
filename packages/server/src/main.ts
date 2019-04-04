
import * as npmPackage from '../package.json';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


// Services
import { ILogService, LogService } from './services/log-service'
import { ISimulationService, SimulationService } from './services/simulation-service';
import { IGeoFencerService, GeoFencerService } from './services/geo-fencer-service';
import { IConfigService, ConfigService } from './services/config-service';

import { ITestBedAdapterSettings, TestBedKafkaService } from './services/test-bed-kafka-service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Inject } from '@nestjs/common';
import { GeofencerProvider } from './geofencer-provider';
var path = require('path');


/* Geo Fencer server 

Creates the webserver NEST.JS (uses express under the hood) and
 - Creates the provider (the providers hosts all services)
 - Disable CORS (all hostst allowed)
 - Creates a static puplic share on webserver
 - Create swagger documentation (entrypoint on websever)
 */
export class GeoFencerServer {

  private server: NestExpressApplication;
  private provider: GeofencerProvider;

  constructor() {
    const logService = new LogService();
    //provider.GetTestBedKafkaService().GenerateTestMessages();
    this.StartNestServerAsync()
      .then(server => {
        this.provider = server.get(GeofencerProvider); // Injection cannot be done in constructor
      });



  }

  // Setup NEST.JS REST server
  async StartNestServerAsync(): Promise<NestExpressApplication> {
    // Create the server
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true /* enable preflight cors */ });
    const configService = app.get(GeofencerProvider).ConfigService;

    // Add response header to all incomming requests
    // Use express from this
    app.use((req: any, res: any, next: any) => {
      res.header('Access-Control-Allow-Origin', '*'); // Disable CORS (not for production)
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
/*
    NEST.JS also supports CORS:
    const corsOptions = {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204,

    }
    app.enableCors(corsOptions); // Allows all clients
*/

    // Serve the public folder directory
    const publicDirectory: string = path.join(process.cwd(), 'public');
    //const publicDirectory = join(__dirname, '..', 'public');
    app.useStaticAssets(publicDirectory);
    console.log(`Files in ${publicDirectory} hosted in http://localhost:${configService.GetNestServerPortNumber()}/public`);

    // Create swagger documentation
    const options = new DocumentBuilder()
      .setTitle('Geo fencer')
      .setDescription('Geo fencer API description')
      .setVersion('1.0')
      .addTag('GeoFencer')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document); // http://<host>:<port>/api
    console.log(`Swagger doc: http://localhost:${configService.GetNestServerPortNumber()}/api `);
    console.log(`Download open api definition: http://localhost:${configService.GetNestServerPortNumber()}/api-json `);

    // Start server
    await app.listen(configService.GetNestServerPortNumber());
    return app;
  }
}
