import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

const env_path = path.join(__dirname, "../.env");
dotenv.config({ path: env_path });
// console.log("env_path:", env_path);

// console.log('Database User:', process.env.DB_USER);
// console.log('Database Host:', process.env.DB_HOST);
// console.log('Database Name:', process.env.DB_NAME);
// console.log('Database Password:', process.env.DB_PASSWORD);
// console.log('Database Port:', process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

export default pool;
