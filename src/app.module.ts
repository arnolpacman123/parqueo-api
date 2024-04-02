import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingGateway } from './parking/gateways/parking.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/orm.config';
import { Parking } from './parking/models/entities/parking.entity';
import { ParkingsController } from './parking/controllers/parkings.controller';
import { ParkingsService } from './parking/services/parkings.service';
import { MapTileController } from './maps/controllers/map-tiles.controller';
import { MapTileService } from './maps/services/map-tiles.service';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Parking])],
  controllers: [AppController, ParkingsController, MapTileController],
  providers: [AppService, ParkingGateway, ParkingsService, MapTileService],
})
export class AppModule {}
