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
  static async signUp(req, res) {
    const { body } = req;
    const validUser = await Users.createUser(body);
    const {
      email, firstName, lastName, password,
    } = body;

    if (!email || !firstName || !lastName || !password) {
      res.send({
        status: 400,
        message: 'Fill in the required input fields',
      });
    }
    let newUser = Users.find(user => user.email === email);
    if (newUser) {
      res.send({
        status: 400,
        message: 'Oops! email already exists',
      });
    } else {
      newUser = { email, firstName, lastName, password, id: new Date().getTime()}
      const token = generateToken(newUser.id);
      Users.push(newUser);
      res.send({
        status: 201,
        data: [
          token,
          newUser.id,
          validUser.firstName,
          newUser.lastName,
          newUser.email,
          newUser.password,
        ],
      });
    }
  }

 
}
