import { Injectable } from '@nestjs/common';
import { MapTile } from '../models/interfaces/map-tile.interface';

@Injectable()
export class MapTileService {
  mapTiles: MapTile[] = [
    {
      name: 'OpenStreetMap',
      url: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=gstc1HWmTnndFXytaloa',
    },
  ];

  getMapTiles() {
    return this.mapTiles;
  }
}
