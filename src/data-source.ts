import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./user/entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "yapyeeqiang",
  password: "yeeqiang020720",
  database: "taplify",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
