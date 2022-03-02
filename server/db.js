import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
const { user, password } = process.env;
const pool = new Pool({
  user: user,
  password: password,
  host: "localhost",
  port: 5432,
  database: "jwtauth",
});

export default pool;
