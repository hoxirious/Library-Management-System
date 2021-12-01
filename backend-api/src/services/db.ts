import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

export const db = mysql.createConnection(config);