import ExpressValidator from 'express-validator/check';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/authToken';
import UserModel from '../models/userModel';

const { validationResult } = ExpressValidator;

export default class UserController {
  /**
   * @description - Create a new user account
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof UserController
   *
   * @returns {object} Class instance
   */
  static async signUp(req, res) {
    const errors = validationResult(req)
      .array()
      .map(error => error.msg);
    const newUserObj = req.body;
    if (errors.length < 1) {
      newUserObj.password = bcrypt.hashSync(newUserObj.password, 10);
      newUserObj.admin = false;
      const user = await UserModel.addNewUser(newUserObj);
      if (!user.rowCount) {
        return res.status(400).json({
          status: 400,
          error: 'A user with your email already exists.',
        });
      }
      delete user.rows[0].password;
      const token = generateToken(user.rows[0]);
      return res.status(200).json({
        status: 200,
        data:
          {
            token,
            user: user.rows[0],
          },
      });
    }
    return res.status(400).json({
      status: 400,
      error: errors,
    });
  }

  static async signIn(req, res) {
    const errors = validationResult(req)
      .array()
      .map(error => error.msg);
    if (errors.length < 1) {
      const { email, password } = req.body;
      const user = await UserModel.getByEmail(email);
      if (!user.rowCount) {
        return res.status(400).json({
          status: 400,
          error: 'You do not have an active account, please sign up.',
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        password,
        user.rows[0].password,
      );
      if (passwordIsValid) {
        delete user.rows[0].password;
        const token = generateToken(user.rows[0]);
        return res.status(200).json({
          status: 200,
          data:
              {
                token,
                user: user.rows[0],
              },
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Password is invalid!',
      });
    }
    return res.status(400).json({
      status: 400,
      error: errors,
    });
  }
}
