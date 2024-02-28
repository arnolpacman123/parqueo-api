import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { InjectRepository } from "@nestjs/typeorm";
import { Parking } from "../models/entities/parking.entity";
import { Repository } from "typeorm";
import { ParkingUpdateDto } from "../models/dto/parking-update.dto";

@WebSocketGateway({
  namespace: "parking",
  cors: {
    origin: "*"
  }
})
export class ParkingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>
  ) {
    this.parkingRepository.find().then((parkings) => {
      this.parkings = parkings;
    });
  }

  @WebSocketServer()
  server: Server;
  parkings: Parking[] = [];

  async handleConnection(
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
