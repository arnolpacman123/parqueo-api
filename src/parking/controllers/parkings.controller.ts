import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ParkingsService } from "../services/parkings.service";
import { ParkingUpdateDto } from "../models/dto/parking-update.dto";

@Controller("parkings")
export class ParkingsController {
  constructor(
    private readonly parkingsService: ParkingsService
  ) {
  }

  @Get()
  async findAll() {
    return this.parkingsService.findAll();
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() parkingUpdateDto: ParkingUpdateDto,
  ) {
    return this.parkingsService.update(+id, parkingUpdateDto);
  }

  @Get("credential/:credential")
  async findByCredential(
    @Param("credential") credential: string,
  ) {
    return this.parkingsService.findByCredential(credential);
  }
}
