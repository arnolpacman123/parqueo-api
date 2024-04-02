import { Injectable } from '@nestjs/common';

@Injectable()
export class MapTileService {
    mapTiles = [
        'https://api.maptiler.com/maps/openstreetmap/style.json?key=gstc1HWmTnndFXytaloa',
    ];

    getMapTiles() {
        return this.mapTiles;
    }
}
