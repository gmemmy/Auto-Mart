import { Client } from 'pg';
import dotenv from 'dotenv';
import { carAdsTable, purchaseOrderTable, userTable } from './tables';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// eslint-disable-next-line import/prefer-default-export
export const createTables = async () => {
  try {
    await client.connect();
    await client.query(carAdsTable);
    await client.query(purchaseOrderTable);
    await client.query(userTable);
    await client.end();
    // eslint-disable-next-line no-console
    console.log('All tables created successfully');
    // eslint-disable-next-line no-unused-expressions
    process.exit[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-unused-expressions
    process.exit[1];
  }
};

createTables();
