
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { NestApplicationOptions  } from '@nestjs/common';

import { AllExceptionsFilter } from './controllers/allexceptions';
// Services
import { ILogService, LogService } from './services/log-service';

import { ITestBedAdapterSettings, TestBedKafkaService } from './services/test-bed-kafka-service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Express } from 'express';
import { join } from 'path';
import { Inject } from '@nestjs/common';
import { GeofencerProvider } from './geofencer-provider';
import path = require('path');
import express = require('express');

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
    // provider.GetTestBedKafkaService().GenerateTestMessages();
    this.StartNestServerAsync()
      .then(server => {
        this.provider = server.get(GeofencerProvider); // Injection cannot be done in constructor
        this.provider.SetServer(server);
      });



  }

  // Setup NEST.JS REST server
  async StartNestServerAsync(): Promise<NestExpressApplication> {
    // Create the server
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: { origin: true, preflightContinue: true } /* enable preflight cors */ });
    const configService = app.get(GeofencerProvider).ConfigService;

    // Add response header to all incomming requests
    // Use express from this
    app.use((_req: any, res: any, next: any) => {
      res.header('Access-Control-Allow-Origin', 'http://geofencer-webapp.ras.nl'); // Disable CORS (not for production)
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
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
    // const publicDirectory = join(__dirname, '..', 'public');


    app.use('/public', express.static(publicDirectory));
    console.log(`'http://localhost:${configService.GetNestServerPortNumber()}/public': Host files from '${publicDirectory}'`);

    // Handle exceptions in http response
    app.useGlobalFilters(new AllExceptionsFilter());

    // Create swagger documentation
    const options = new DocumentBuilder()
      .setTitle('Geo fencer')
      .setDescription('Geo fencer API description')
      .setVersion('1.0')
      .addTag('GeoFencer')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document); // http://<host>:<port>/api
    console.log(`'http://localhost:${configService.GetNestServerPortNumber()}/api': OpenApi (swagger) documentation.`);
    console.log(`'http://localhost:${configService.GetNestServerPortNumber()}/api-json': OpenApi (swagger) definition. `);

    // Start server
    await app.listen(configService.GetNestServerPortNumber());
    return app;
  }
}
