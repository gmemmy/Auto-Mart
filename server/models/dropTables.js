import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const dropTables = async () => {
  await client.connect();
  await client.query('DROP TABLE IF EXISTS carAds;');
  await client.query('DROP TABLE IF EXISTS purchaseOrder:');
  await client.query('DROP TABLE IF EXISTS Users:');
  await client.end();
  // eslint-disable-next-line no-console
  console.log('All tables dropped successfully!');
  process.exit(0);
};

dropTables();
