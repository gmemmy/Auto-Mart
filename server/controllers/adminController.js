import UserModel from '../models/userModel';
import CarModel from '../models/carAdsModel';

export default class AdminController {
  /**
  * @description - View all unsold cars
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof AdminController
  *
  * @returns {object} Class instance
  */
  static async viewAllCarRecords(req, res) {
    const allCars = await CarModel.getAllCars();
    if (allCars.rowCount >= 1) {
      return res.status(200).json({
        status: 200,
        data: allCars.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Sorry, no car was found',
    });
  }

  /**
* @description - View all users
* @static
*
* @param {object} req - HTTP Request
* @param {object} res - HTTP Response
*
* @memberof AdminController
*
* @returns {object} Class instance
*/
  static async viewAllUsers(req, res) {
    const allUsers = await UserModel.getAllUsers();
    if (allUsers.rowCount >= 1) {
      return res.status(200).json({
        status: 200,
        data: allUsers.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Sorry, no user was found',
    });
  }

  /**
  * @description - Delete a specific car record
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof AdminController
  *
  * @returns {object} Class instance
  */
  static async deleteASpecificRecord(req, res) {
    await CarModel.deleteById(req.params.id);
    res.status(200).json({
      status: 200,
      data: 'Car advert successfully deleted',
    });
  }
}
