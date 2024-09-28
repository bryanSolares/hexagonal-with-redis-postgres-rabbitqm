import { Pool } from "pg";
import envs from "dotenv";

envs.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: 5432,
});

export const connectPostgres = async () => {
  await pool.connect();
};

export const disconnectPostgres = async () => {
  await pool.end();
};

export default pool;
