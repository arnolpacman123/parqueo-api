import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { InjectRepository } from "@nestjs/typeorm";
import { Parking } from "../models/entities/parking.entity";
import { Repository } from "typeorm";
import { ParkingUpdateDto } from "../models/dto/parking-update.dto";
import { Client } from "pg";

@WebSocketGateway({
  namespace: "parking",
  cors: {
    origin: "*"
  }
})
export class ParkingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>
  ) {
    this.parkingRepository.find({
      order: {
        id: "ASC"
      }
    }).then((parkings) => {
      this.parkings = parkings;
    });
  }

  async afterInit(server: any) {
    this.parkings = await this.parkingRepository.find();
    const client = new Client({
      host: "postgresql-arnolguevara21.alwaysdata.net",
      user: "arnolguevara21",
      password: "Aspirine217021220",
      database: "arnolguevara21_smtt_parking_db"
    });
    try {
      await client.connect();
      await client.query("LISTEN parking_update");
      client.on("notification", async (_) => {
        this.parkings = await this.parkingRepository.find();
        server.emit("update", this.parkings);
      });
    } catch (e) {
      console.error(e);
    }
  }

  @WebSocketServer()
  server: Server;
  parkings: Parking[] = [];

  handleConnection(
    @ConnectedSocket() client: Socket,
    @MessageBody() ..._: any[]
  ) {
    client.broadcast.emit("connected");
    this.server.to(client.id).emit("update", this.parkings);
  }

  @SubscribeMessage("update")
  async handleUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() parkingUpdateDto: ParkingUpdateDto
  ) {
    const parking = await this.parkingRepository.findOne({
      where: {
        id: parkingUpdateDto.id
      }
    });
    if (parking) {
      const { currentOccupancy } = parkingUpdateDto;
      if (currentOccupancy > parking.capacity) {
        return this.parkings;
      }
      parking.currentOccupancy = parkingUpdateDto.currentOccupancy;
      await this.parkingRepository.save(parking);
      this.parkings = await this.parkingRepository.find();
    }
    client.broadcast.emit("update", this.parkings);
    return this.parkings;
  }

  handleDisconnect(
    @ConnectedSocket() client: Socket
  ) {
    client.broadcast.emit("disconnected");
  }
}
