// eslint-disable-next-line import/prefer-default-export
export const carAdsTable = `
  CREATE TABLE IF NOT EXISTS carAds (
   id SERIAL,
   owner SERIAL,
   createdOn TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   state varchar(20),
   status varchar(20),
   price int,
   manufacturer varchar(50),
   model varchar(50),
   bodyType text,
   imgUrl varchar(50)
  );
`;

export const purchaseOrderTable = `
  CREATE TABLE IF NOT EXISTS purchaseOrders (
   id SERIAL,
   buyer varchar(50),
   createdOn TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   carId int,
   price int,
   priceOffered int,
   status varchar(50)
  );
`;

export const userTable = `
 CREATE TABLE IF NOT EXISTS Users (
  id SERIAL,
  email varchar(30) NOT NULL UNIQUE,
  createdOn TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  username varchar(30),
  firstName varchar(255),
  lastName varchar(255),
  password varchar(330),
  address varchar(255),
  isAdmin boolean
 );
 INSERT INTO Users(email, firstname, lastname, password, address, isadmin)
        VALUES ('nuelojay22@gmail.com', 'Emmanuel', 'Atawodi', '$2b$10$f0y/rrEk0JfBb1UT/gju5.mRk55urRN5jvLHN53hS6kjKphh4zmxG', 'Surulere', true)
`;
