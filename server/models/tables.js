// eslint-disable-next-line import/prefer-default-export
export const carAdsTable = `
  CREATE TABLE IF NOT EXISTS carAds (
   id int,
   owner varchar(30),
   createdOn date,
   state varchar(20),
   status varchar(20),
   price int,
   manufacturer varchar(50),
   model varchar(50),
   bodyType text,
  );
`;

export const purchaseOrderTable = `
  CREATE TABLE IF NOT EXISTS purchaseOrders (
   id int,
   buyer varchar(50),
   carId int,
   amount int,
   status varchar(50),
  );
`;

export const userTable = `
 CREATE TABLE IF NOT EXISTS Users (
  id int,
  email varchar(30),
  firstName varchar(255),
  lastName varchar(255),
  password varchar(30),
  address varchar(255),
  isAdmin boolean
 );
`;
