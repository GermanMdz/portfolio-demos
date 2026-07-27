import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import "reflect-metadata";
import { DataSource } from "typeorm";
import { FeriaEntity } from "./infra/entities/feriaEntity";
import { UsuarioEntity } from "./infra/entities/usuarioEntity";
import { InscripcionEntity } from "./infra/entities/inscripcion";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  logging: false,
  entities: [FeriaEntity, UsuarioEntity, InscripcionEntity],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});