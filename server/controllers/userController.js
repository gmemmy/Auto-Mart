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
        return res.send({
          status: 400,
          error: 'A user with your email already exists.',
        });
      }
      delete user.rows[0].password;
      const token = generateToken(user.rows[0]);
      return res.send({
        status: 201,
        data:
          {
            token,
            user: user.rows[0],
          },
      });
    }
    return res.send({
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
        res.send({
          status: 400,
          error: 'You do not have an active account, please sign in.',
        });
      } else {
        const passwordIsValid = bcrypt.compareSync(
          password,
          user.rows[0].password,
        );
        if (passwordIsValid) {
          delete user.rows[0].password;
          const token = generateToken(user.rows[0]);
          res.send({
            status: 200,
            data:
              {
                token,
                user: user.rows[0],
              },
          });
        } else {
          res.send({
            status: 400,
            error: 'Password is invalid!',
          });
        }
      }
    } else {
      res.send({
        status: 400,
        error: errors,
      });
    }
  }
}
