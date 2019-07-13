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
        email, username, firstName, lastName, password, address, isAdmin,
      } = newUserObj;

      const query = `INSERT INTO Users(email, firstName, lastName, password, address, isAdmin) 
        VALUES ('${email.trim()}', '${username.trim()}', '${firstName.trim()}', '${lastName.trim()}', '${password.trim()}', '${address.trim()}', '${isAdmin},')
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
