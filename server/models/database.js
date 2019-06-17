import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// eslint-disable-next-line no-unused-vars
pool.on('error', (err, client) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected erroe on idle client', err);
  process.exit(-1);
});

pool.connect()