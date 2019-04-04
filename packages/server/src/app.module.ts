import { ManagementService } from './controllers/management.service';
import { Module } from '@nestjs/common';
import { ManagementController } from './controllers/management.controller';
import { GeofencerProvider } from './geofencer-provider';



export const GeofencerProviderDef = {
  provide: 'GeofencerProvider',
  useFactory: () => {
    return new GeofencerProvider();
  }
}


@Module({
  imports: [],
  controllers: [ManagementController],
  providers: [ManagementService, GeofencerProviderDef],

})
export class AppModule {}
