import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class CarModel {
  // Creates a new car advertisement
  static async addCar(newCarObj) {
    try {
      const {
        email, state, status, price, manufacturer, model, bodyType, imgUrl,
      } = newCarObj;

      const query = `INSERT INTO carAds(email, state, status, price, manufacturer, model, bodyType, imgUrl)
     VALUES ('${email}', '${state}', '${status}', '${price}', '${manufacturer}', '${model}', '${bodyType}', '${imgUrl}')
     RETURNING *
   `;
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Gets a car by id
  static async getById(id) {
    try {
      const query = `SELECT * FROM carAds WHERE id = '${id}'`;
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Gets all cars
  static async getAll({ fieldName, fieldValue }) {
    try {
      const query = fieldName && fieldValue
        ? `
        SELECT * FROM carAds
        WHERE ${fieldName} = ${fieldName === 'email' ? String(fieldValue) : fieldValue}
        ` : 'SELECT * FROM carAds';

      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Gets a car by body type
  static async getBodyType(bodyType) {
    try {
      const query = `SELECT * FROM carAds WHERE bodyType = '${bodyType}'`;
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Gets a car by body type
  static async getUsedState(state) {
    try {
      const query = `SELECT * FROM carAds WHERE state = '${state}'`;
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // updates a car record
  static async patch(payload) {
    try {
      const { fieldName, data, id } = payload;
      const query = `
         UPDATE carAds
         SET ${fieldName} = '${data}'
         WHERE id = ${Number(id)}
         RETURNING *
        `;
      const response = await pool.query(query);
      // console.log(response, 'nj');
      return response;
    } catch (error) {
      return error;
    }
  }

  // deletes a car record
  static async deleteById(id) {
    try {
      const query = `
         DELETE FROM carAds
         WHERE id = ${Number(id)}
         RETURNING id
      `;
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // creates a new purchase order
  static async addOrder(newOrderObj) {
    try {
      const {
        buyer, carId, price, priceOffered, status,
      } = newOrderObj;

      const query = `INSERT INTO purchaseOrders(buyer, carId, price, priceOffered, status)
      VALUES ('${buyer}', '${carId}', '${price}', '${priceOffered}', '${status}')
      RETURNING *
      `;


      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Updates the price of a purchase order
  static async patchOrder(payload) {
    try {
      const { fieldName, data, id } = payload;
      const query = `
      UPDATE purchaseOrders
       SET ${fieldName} = '${data}'
       WHERE id = ${Number(id)}
       RETURNING *
       `;

      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }
}
