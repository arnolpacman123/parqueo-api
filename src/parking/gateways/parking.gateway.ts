import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from '../models/entities/parking.entity';
import { Repository } from 'typeorm';
import { Client } from 'pg';

@WebSocketGateway({
  namespace: 'parking',
  cors: {
    origin: '*',
  },
})
export class ParkingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
  ) {
    this.parkingRepository
      .find({
        order: {
          id: 'ASC',
        },
      })
      .then((parkings) => {
        this.parkings = parkings;
      });
  }

  async afterInit(server: any) {
    this.parkings = await this.parkingRepository.find();
    const client = new Client({
      host: 'postgresql-arnolguevara21.alwaysdata.net',
      user: 'arnolguevara21',
      password: 'Aspirine217021220',
      database: 'arnolguevara21_smtt_parking_db',
    });
    try {
      await client.connect();
      await client.query('LISTEN parking_update');
      client.on('notification', async (_) => {
        this.parkings = await this.parkingRepository.find({
          order: {
            id: 'ASC',
          },
        });
        server.emit('update', this.parkings);
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
    client.broadcast.emit('connected');
    this.server.to(client.id).emit('update', this.parkings);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('disconnected');
  }
}
