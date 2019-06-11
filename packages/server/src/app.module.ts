import { ManagementService } from './controllers/management.service';
import { Module } from '@nestjs/common';
import { ManagementController } from './controllers/management.controller';
import { GeofencerProvider } from './geofencer-provider';
import { NotificationsModule } from './notifications/notification-module';
import { GenericController } from './controllers/generic.controller';


export const GeofencerProviderDef = {
  provide: 'GeofencerProvider',
  useFactory: () => {
    return new GeofencerProvider();
  }
};


@Module({
  imports: [ NotificationsModule],
  controllers: [ManagementController, GenericController ],
  providers: [ManagementService, GeofencerProviderDef ],

})
export class AppModule {}
