import { ManagementService } from './controllers/management.service';
import { Module } from '@nestjs/common';
import { ManagementController } from './controllers/management.controller';
import { GeofencerProvider } from './geofencer-provider';
import { NotificationsModule } from './notifications/notification-module';
import { GenericController } from './controllers/generic.controller';
import * as path from 'path';

import {
  LayerController,
  DefaultWebSocketGateway,
  LayerService,
  SourceController,
  FeatureController
} from '@csnext/cs-layer-server';

export const GeofencerProviderDef = {
  provide: 'GeofencerProvider',
  useFactory: () => {
    return new GeofencerProvider();
  }
};


@Module({
  imports: [ NotificationsModule],
  controllers: [ManagementController, GenericController, LayerController, FeatureController, SourceController ],
  providers: [ManagementService, GeofencerProviderDef, LayerService, DefaultWebSocketGateway ],

})
export class AppModule {
  readonly configFolder: string =
  process.env.LAYER_SERVER_CONFIG_FOLDER || './../../../configs/layers/';

  constructor(private readonly layerService: LayerService) {
    const folder = path.join(__dirname, this.configFolder);
    console.log(
      `Initializing layer-server with configuration folder: ${folder}`
    );
    this.layerService.init('server.config.json', folder);
  }
}
