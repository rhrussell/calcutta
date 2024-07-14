import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

const env_path = path.join(__dirname, "../.env");
dotenv.config({ path: env_path });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

export default pool;
