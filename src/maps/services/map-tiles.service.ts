import { Injectable } from '@nestjs/common';
import { MapTile } from '../models/interfaces/map-tile.interface';

@Injectable()
export class MapTileService {
  mapTiles: MapTile[] = [
    {
      name: 'OpenStreetMap',
      url: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=gstc1HWmTnndFXytaloa',
    },
    {
      name: 'MapTiler Basic',
      url: 'https://api.maptiler.com/maps/basic-v2/style.json?key=gstc1HWmTnndFXytaloa',
    },
    {
      name: 'MapTiler Streets',
      url: 'https://api.maptiler.com/maps/streets-v2/style.json?key=gstc1HWmTnndFXytaloa',
    },
    {
      name: 'MapTiler Topo',
      url: 'https://api.maptiler.com/maps/topo-v2/style.json?key=gstc1HWmTnndFXytaloa',
    },
  ];

  getMapTiles() {
    return this.mapTiles;
  }
}
