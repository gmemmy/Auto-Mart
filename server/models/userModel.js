/* eslint-disable camelcase */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class UserModel {
  // Creates a new user
  static async addNewUser(newUserObj) {
    try {
      const {
        email, first_name, last_name, password, address,
      } = newUserObj;

      const query = `INSERT INTO Users(email, first_name, last_name, password, address) 
        VALUES ('${email.trim()}', '${first_name.trim()}', '${last_name.trim()}', '${password.trim()}', '${address.trim()}')
        RETURNING *
      `;
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Gets all users
  static async getAll({ fieldName, fieldValue }) {
    try {
      const query = fieldName && fieldValue
        ? `
        SELECT * FROM Users
        WHERE ${fieldName} = ${fieldName === 'owner' ? String(fieldValue) : fieldValue}
        ` : 'SELECT * FROM Users';
      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Gets user by email
  static async getByEmail(email) {
    try {
      const query = `SELECT * FROM Users WHERE email = '${email.trim()}' `;

      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }

  // Gets user by Id
  static async getById(id) {
    try {
      const query = `SELECT * FROM Users WHERE id = '${id} `;

      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }
}
