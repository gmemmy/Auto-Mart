/* eslint-disable camelcase */
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
        state, status, price, manufacturer, model, body_type, img_url,
      } = newCarObj;

      const query = `INSERT INTO carAds(state, status, price, manufacturer, model, body_type, img_url)
     VALUES ('${state}', '${status}', '${price}', '${manufacturer}', '${model}', '${body_type}', '${img_url}')
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
        WHERE ${fieldName} = ${fieldName === 'id' ? Number(fieldValue) : fieldValue}
        ` : 'SELECT * FROM carAds';

      const response = await pool.query(query);
      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  // Gets a car by body type
  static async getBodyType(body_type) {
    try {
      const query = `SELECT * FROM carAds WHERE body_type = '${body_type}'`;
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
      const { field_name, data, id } = payload;
      const query = `
         UPDATE carAds
         SET ${field_name} = '${data}'
         WHERE id = ${Number(id)}
         RETURNING *
        `;
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // updates an order record
  static async Orderpatch(payload) {
    try {
      const { field_name, data, id } = payload;
      const query = `
         UPDATE purchaseOrders
         SET ${field_name} = '${data}'
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
        amount, car_id,
      } = newOrderObj;

      const query = `INSERT INTO purchaseOrders(amount, car_id)
      VALUES ('${amount}', '${car_id}')
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
      const { field_name, data, car_id } = payload;
      const query = `
      UPDATE purchaseOrders
       SET ${field_name} = '${data}'
       WHERE car_id = ${Number(car_id)}
       RETURNING *
       `;

      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }
}
