import ExpressValidator from 'express-validator/check';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/authToken';
import Users from '../data/User';

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
  static signUp(req, res) {
    // Use express validator to validate the user's input
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const { email, firstName, lastName } = req.body;

      // Checks if the email entered by the user already exists and throws an error if it does
      const newUserEmail = Users.find(user => user.email === email);
      if (newUserEmail) {
        res.send({
          status: 409,
          error: 'Email already exists',
        });
      } else {
        // hash user pasword
        req.body.password = bcrypt.hash(req.body.password, 10, (err) => {
          if (err) {
            res.send({
              status: 500,
              error: err,
            });
          } else {
            const newUser = {
              id: new Date().getTime(),
              firstName,
              lastName,
              email,
            };
            const token = generateToken(newUser.id);
            Users.push(newUser);
            res.send({
              status: 201,
              message: 'User successfully created',
              data: [token, newUser],
            });
          }
        });
      }
    } else {
      res.send({
        status: 400,
        error: errors,
      });
    }
  }

  static signIn(req, res) {
    const existingUser = Users.find(
      User => User.token === String(req.params.token),
    );
    if (!existingUser) {
      res.send({
        status: 404,
        error: 'This account does not exist!',
      });
    } else {
      res.send({
        status: 200,
        data: [existingUser],
      });
    }
  }
}
