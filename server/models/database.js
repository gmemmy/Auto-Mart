import { Pool } from 'pg';
import dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import { carAdsTable, purchaseOrderTable, userTable } from './tables';


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
  .then(client => client.query(userTable)
    .then((res) => {
      client.release();
      // eslint-disable-next-line no-console
      console.log(res.rows[0]);
    })
    .catch((err) => {
      client.release();
      // eslint-disable-next-line no-console
      console.log(err);
    }));
