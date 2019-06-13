import advertisements from '../data/carAds';

export default class AdminController {
  /**
  * @description - View all unsold cars
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
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
}
