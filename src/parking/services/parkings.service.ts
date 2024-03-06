import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Parking } from "../models/entities/parking.entity";
import { Repository } from "typeorm";

@Injectable()
export class ParkingsService {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>
  ) {
  }

  async findAll(): Promise<Parking[]> {
    return this.parkingRepository.find({
      order: {
        id: "ASC",
      },
    });
  }
}
