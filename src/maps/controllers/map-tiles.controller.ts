import { Controller, Get } from '@nestjs/common';
import { MapTileService } from '../services/map-tiles.service';

@Controller('map-tiles')
export class MapTileController {
  constructor(private mapTileService: MapTileService) {}

  @Get()
  getMapTiles() {
    return this.mapTileService.getMapTiles();
  }
}
