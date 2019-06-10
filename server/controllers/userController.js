import { generateToken } from '../helpers/authToken';
import Users from '../data/User';

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
    const { body } = req;
    const {
      email, firstName, lastName, password,
    } = body;

    if (!email || !firstName || !lastName || !password) {
      res.send({
        status: 400,
        error: 'Fill in the required input fields',
      });
    }
    let newUser = Users.find(user => user.email === email);
    if (newUser) {
      res.send({
        status: 400,
        error: 'Oops! email already exists',
      });
    } else {
      newUser = {
        id: new Date().getTime(), firstName, lastName, email,
      };
      const token = generateToken(newUser.id);
      Users.push(newUser);
      res.send({
        status: 201,
        data: [
          token,
          newUser,
        ],
      });
    }
  }

  static signIn(req, res) {
    const existingUser = Users.find(User => User.token === String(req.params.token));
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
