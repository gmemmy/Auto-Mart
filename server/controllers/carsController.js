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
    // pick last advertisement and check its id
    // The last advertisement's id + 1 is the new advertisement's id

    const lastAdvertisement = advertisements.reverse()[0];
    body.createdOn = faker.date.recent();
    body.id = lastAdvertisement.id + 1;
    advertisements.push(body);
    res.send({
      status: 200,
      data: [
        {
          id: body.id,
          message: 'Created Car sale advertisement',
        },
      ],
    });
  }
}