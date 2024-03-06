import { Controller, Get } from "@nestjs/common";
import { ParkingsService } from "../services/parkings.service";

@Controller('parkings')
export class ParkingsController {
  constructor(
    private readonly parkingsService: ParkingsService,
  ) {
  }

  @Get()
  async findAll() {
    return this.parkingsService.findAll();
  }
}
