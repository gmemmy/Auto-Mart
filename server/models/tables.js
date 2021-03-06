// eslint-disable-next-line import/prefer-default-export
export const carAdsTable = `
  CREATE TABLE IF NOT EXISTS carAds (
   id SERIAL,
   owner SERIAL,
   email varchar(30),
   created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   state varchar(20),
   status varchar(20),
   price int,
   manufacturer varchar(50),
   model varchar(50),
   body_type text,
   img_url varchar(50)
  );
`;

export const purchaseOrderTable = `
  CREATE TABLE IF NOT EXISTS purchaseOrders (
   id SERIAL,
   buyer varchar(50),
   created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   car_id int,
   amount int,
   new_price_offered int,
   status varchar(50)
  );
`;

export const userTable = `
 CREATE TABLE IF NOT EXISTS Users (
  id SERIAL,
  email varchar(30) NOT NULL UNIQUE,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  username varchar(30),
  first_name varchar(255),
  last_name varchar(255),
  password varchar(330),
  address varchar(255),
  is_admin boolean
 );
 INSERT INTO Users(email, first_name, last_name, password, address, is_admin)
        VALUES ('nuelojay22@gmail.com', 'Emmanuel', 'Atawodi', '$2b$10$f0y/rrEk0JfBb1UT/gju5.mRk55urRN5jvLHN53hS6kjKphh4zmxG', 'Surulere', true)
`;
