import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class UserModel {
/**
 * @description - Sign
 * @static
 *
 * @param {object} - User data object
 *
 * @memberof UserModel
 *
 * @returns {object} Class instance
 * */
  static async addNewUser(newUserObj) {
    try {
      const {
        email, firstName, lastName, password, address, isAdmin,
      } = newUserObj;

      const query = `INSERT INTO Users(email, firstName, lastName, password, address, isAdmin) 
        VALUES ('${email.trim()}, ${firstName.trim()}, ${lastName.trim()}, ${password.trim()}, ${address.trim()}, ${isAdmin},')
        RETURNING *
      `;

      const response = await pool.query(query);
      return response;
    } catch (error) {
      return error;
    }
  }
}
