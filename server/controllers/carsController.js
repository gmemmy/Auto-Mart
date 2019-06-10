import faker from 'faker';
import advertisements from '../data/carAds';
import purchaseOrder from '../data/purchaseOrder';

export default class CarsController {
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
  static viewAllUnsoldCars(req, res) {
    const unsoldCars = advertisements.filter(advertisment => advertisment.status === 'Available');
    if (unsoldCars.length >= 1) {
      res.send({
        status: 200,
        data: unsoldCars,
      });
    } else {
      res.send({
        status: 404,
        error: 'No car advertisement found!',
      });
    }
  }

  /**
  * @description - View a specific car
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
  *
  * @returns {object} Class instance
  */
  static viewSpecificCar(req, res) {
    const specificCar = advertisements.find(
      advertisment => advertisment.id === Number(req.params.id),
    );
    if (!specificCar) {
      res.send({
        status: 404,
        error: 'Oops! no car found with this id',
      });
    } else {
      res.send({
        status: 200,
        data: [specificCar],
      });
    }
  }

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
      owner, state, price, manufacturer,
    } = body;
    if (!owner || !state || !price || !manufacturer) {
      res.send({
        status: 400,
        error: 'Fill in the required fields to create an advertisement',
      });
    } else {
      // pick last advertisement and check its id
    // The last advertisement's id + 1 is the new advertisement's id

      const lastAdvertisement = advertisements.reverse()[0];
      body.created_on = faker.date.recent();
      body.id = lastAdvertisement.id + 1;
      advertisements.push(body);
      res.send({
        status: 201,
        data: [lastAdvertisement],
      });
    }
  }

  /**
  * @description - Update the price of a car sale advertisment
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
  *
  * @returns {object} Class instance
  */
  static updatePriceCarSaleAdvert(req, res) {
    const selectedAdvert = advertisements.find(advert => advert.id === Number(req.params.id));
    if (!selectedAdvert) {
      res.send({
        status: 404,
        error: 'No car sale advertisment was found with the given id',
      });
    } else {
      selectedAdvert.price = faker.finance.amount();
      res.send({
        status: 201,
        data: [selectedAdvert],
        message: 'price of car sale advertisement has been updated',
      });
    }
  }

  /**
  * @description - Update the price of a car sale advertisment
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
  *
  * @returns {object} Class instance
  */
  static updateStatusCarSaleAdvert(req, res) {
    const selectedAdvert = advertisements.find(advert => advert.id === Number(req.params.id));
    if (!selectedAdvert) {
      res.send({
        status: 404,
        error: 'No car sale advertisement was found with the given id',
      });
    } else {
      selectedAdvert.status = 'sold';
      res.send({
        status: 201,
        data: [selectedAdvert],
      });
    }
  }

  /**
  * @description - Make a purchase order
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
  *
  * @returns {object} Class instance
  */
  static makePurchaseOrder(req, res) {
    const { body } = req;

    const lastPurchaseOrder = purchaseOrder.reverse()[0];
    body.id = lastPurchaseOrder.id + 1;
    body.price_offered = faker.finance.amount();
    body.created_on = faker.date.recent();
    purchaseOrder.push(body);
    res.send({
      status: 201,
      data: [lastPurchaseOrder],
    });
  }
}
