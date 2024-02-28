import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ParkingGateway } from "./parking/gateways/parking.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./config/orm.config";
import { Parking } from "./parking/models/entities/parking.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([
      Parking,
    ]),
  ],
  controllers: [ AppController ],
  providers: [ AppService, ParkingGateway ]
})
export class AppModule {
}
