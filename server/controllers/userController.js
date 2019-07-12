import ExpressValidator from 'express-validator/check';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/authToken';
import UserModel from '../models/userModel';
import errorHandler from '../helpers/errorhandler';

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
      newUserObj.createdOn = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      newUserObj.admin = false;
      const user = await UserModel.addNewUser(newUserObj);

      if (!(user.rowCount === 1)) {
        const error = user;
        res.send({
          status: 400,
          error: errorHandler.find(err => err.code === error.code).message,
        });
      } else {
        const jwtData = {
          id: user.rows[0].id,
          email: user.rows[0].email,
          firstName: user.rows[0].firstName,
          lastName: user.rows[0].lastName,
          address: user.rows[0].address,
          isAdmin: user.rows[0].isAdmin,
        };

        const token = generateToken(jwtData);
        res.send({
          status: 201,
          data: [
            {
              token,
              user: jwtData,
            },
          ],
        });
      }
    } else {
      res.send({
        status: 400,
        error: errors,
      });
    }
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
          const jwtData = {
            id: user.rows[0].id,
            email: user.rows[0].email,
            firstName: user.rows[0].firstName,
            lastName: user.rows[0].lastName,
            address: user.rows[0].address,
            isAdmin: user.rows[0].isAdmin,
          };
          const token = generateToken(jwtData);
          res.send({
            status: 200,
            data: [
              {
                token,
                user: jwtData,
              },
            ],
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
