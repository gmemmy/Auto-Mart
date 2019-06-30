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
        owner, createdOn, state, status, price, manufacturer, model, bodyType,
      } = newCarObj;

      const query = `INSERT INTO carAds(owner, createdOn, state, status, price, manufacturer, model, bodyType)
     VALUES ('${owner.trim()}', '${createdOn}', '${state}', '${status}', '${price}', '${manufacturer.trim()}, '${model.trim()}', '${bodyType.trim()}')
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
      const query = `SELECT * FROM carAds WHERE id = '${id}' `;
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
        WHERE ${fieldName} = ${fieldName === 'owner' ? Number(fieldValue) : fieldValue}
        ` : 'SELECT * FROM carAds';
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
        buyer, carId, amount, status,
      } = newOrderObj;

      const query = `INSERT INTO purchaseOrders(buyer, carId, amount, status)
      VALUES ('${buyer.trim()}', '${carId}', '${amount}', '${status}')
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
