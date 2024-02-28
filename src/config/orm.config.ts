import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: "postgresql-arnolguevara21.alwaysdata.net",
  username: "arnolguevara21",
  password: "Aspirine217021220",
  database: "arnolguevara21_smtt_parking_db",
  entities: ["dist/**/*.entity{.ts,.js}"],
  autoLoadEntities: true,
};