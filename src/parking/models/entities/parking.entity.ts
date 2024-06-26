import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Point } from 'geojson';

@Entity({
  name: 'parking',
})
export class Parking {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id?: number;

  @Column({
    name: 'geom',
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geom?: Point;

  @Column({
    name: 'is_full',
    type: 'boolean',
  })
  isFull?: boolean;

  @Column({
    name: 'start_attention',
    type: 'text',
  })
  startAttention: string;

  @Column({
    name: 'end_attention',
    type: 'text',
  })
  endAttention: string;

  @Column({
    name: 'image_url',
    type: 'text',
  })
  imageUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    name: 'credential',
    type: 'text',
    unique: true,
  })
  credential: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
