import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

dotenv.config(); // Loads the environment variables from .env file


const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString,
});

export default pool;
