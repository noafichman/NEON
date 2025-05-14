import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'military_db',
  user: 'postgres',
  password: 'postgres',
  ssl: false // Disable SSL for local development
});

export const query = (text: string, params?: any[]) => pool.query(text, params);