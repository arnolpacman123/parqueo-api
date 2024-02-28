import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Point } from "geojson";

@Entity({
  name: "parking"
})
export class Parking {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id?: number;

  @Column({
    name: "geom",
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326
  })
  geom?: Point;

  @Column({
    name: "capacity",
    type: "integer"
  })
  capacity?: number;

  @Column({
    name: "current_occupancy",
    type: "integer"
  })
  currentOccupancy?: number;

  @Column({
    name: "is_full",
    type: "boolean"
  })
  isFull?: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updatedAt?: Date;
}