import faker from 'faker';
import advertisements from '../data/carAds';

export default class CarsController {
  /**
  * @description - Add a new car sale advertisment
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
  *
  * @returns {object} Class instance
  */
  static addCarSaleAdvert(req, res) {
    const { body } = req;
    const {
      status, id, email, createdOn, manufacturer, model,
    } = body;
    if (!status || !id || !email || createdOn || !manufacturer || !model) {
      res.json({
        status: 404,
        error: 'Please fill in the relevant details.',
      });
    } else {
      // pick last advertisement and check its id
      // The last advertisement's id + 1 is the new advertisement's id

      const lastAdvertisement = advertisements.reverse()[0];
      body.createdOn = faker.date.recent();
      body.id = lastAdvertisement.id + 1;
      advertisements.push(req.body);
      res.json({
        status: 200,
        data: [
          {
            id: body.id,
            message: 'Created Car sale asvertisement',
          },
        ],
      });
    }
  }
}
