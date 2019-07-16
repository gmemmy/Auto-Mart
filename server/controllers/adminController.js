import advertisements from '../data/carAds';
import Users from '../data/User';
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
  static viewAllCarRecords(req, res) {
    if (advertisements.length >= 1) {
      res.send({
        status: 200,
        data: [advertisements],
      });
    } else {
      res.send({
        status: 404,
        error: 'No car sale record found',
      });
    }
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
  static viewAllUsers(req, res) {
    if (Users.length >= 1) {
      res.send({
        status: 200,
        data: [Users],
      });
    } else {
      res.send({
        status: 404,
        error: 'No user record found',
      });
    }
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
    await CarModel.deleteById(req.body.id);
    res.status(200).send({
      status: 200,
      data: 'Car advert successfully deleted',
    });
  }
}
