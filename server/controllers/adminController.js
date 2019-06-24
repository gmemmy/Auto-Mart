import advertisements from '../data/carAds';
import Users from '../data/User';

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
  static deleteASpecificRecord(req, res) {
    // make an array containing all the ids of each record and pick the index from there.
    const indexOfRecord = advertisements.map(advert => advert.id).indexOf(Number(req.params.id));

    if (indexOfRecord >= 0) {
      const deleted = advertisements.splice(indexOfRecord, 1);
      if (deleted) {
        res.send({
          status: 200,
          data: [{
            id: req.params.id,
            message: 'Car sale advertisment deleted',
          }],
        });
      } else {
        res.send({
          status: 404,
          error: 'No record was found with the given id',
        });
      }
    }
  }
}
