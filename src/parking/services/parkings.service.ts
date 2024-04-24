import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from '../models/entities/parking.entity';
import { Repository } from 'typeorm';
import { ParkingUpdateDto } from '../models/dto/parking-update.dto';

@Injectable()
export class ParkingsService {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
  ) {}

  async findAll(): Promise<Parking[]> {
    return this.parkingRepository.find({
      order: {
        id: 'ASC',
      },
      select: ['id', 'geom', 'isFull', 'startAttention', 'endAttention', 'imageUrl', 'createdAt'],
    });
  }

  async update(id: number, parkingUpdateDto: ParkingUpdateDto) {
    const parking = await this.parkingRepository.findOne({
      where: {
        id,
      },
    });
    if (!parking) {
      throw new HttpException('Parking not found', HttpStatus.NOT_FOUND);
    }
    return this.parkingRepository.save({
      ...parking,
      ...parkingUpdateDto,
    });
  }

  async findByCredential(credential: string): Promise<Parking> {
    return this.parkingRepository.findOne({
      where: {
        credential,
      },
      select: ['id', 'geom', 'isFull', 'startAttention', 'endAttention', 'imageUrl', 'createdAt'],
    });
  }
}
