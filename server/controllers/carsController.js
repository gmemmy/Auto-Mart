import faker from 'faker';
import advertisements from '../data/carAds';
import purchaseOrder from '../data/purchaseOrder';
import CarModel from '../models/carAdsModel';

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
  static async viewAllUnsoldCars(req, res) {
    const unsoldCars = await CarModel.getAll({ status: 'available' });
    if (unsoldCars.rowCount >= 1) {
      res.send({
        status: 200,
        data: unsoldCars.rows,
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
* @description - View all unsold cars within specific price range
* @static
*
* @param {object} req - HTTP Request
* @param {object} res - HTTP Response
*
* @memberof CarsController
*
* @returns {object} Class instance
*/
  static viewAllUnsoldCarsWithinAPriceRange(req, res) {
    const { minPrice, maxPrice } = req.body;
    const unsoldCars = advertisements.filter(advertisment => advertisment.status === 'Available');
    if (minPrice || maxPrice) {
      unsoldCars.forEach((unsoldCar) => {
        if (minPrice >= unsoldCar.price && maxPrice <= unsoldCar.price) {
          res.send({
            status: 200,
            data: [unsoldCar],
          });
        } else {
          res.send({
            status: 404,
            error: 'No car record found within the specified range',
          });
        }
      });
    } else {
      res.send({
        status: 400,
        error: 'Please specify price range',
      });
    }
  }

  /**
* @description - View all unsold cars within specific price range
* @static
*
* @param {object} req - HTTP Request
* @param {object} res - HTTP Response
*
* @memberof CarsController
*
* @returns {object} Class instance
*/

  static viewAllUnsoldCarsOfSpecificBodyType(req, res) {
    const { bodyType } = req.body;
    const unsoldCars = advertisements.filter(advertisment => advertisment.status === 'Available');

    if (bodyType) {
      unsoldCars.forEach((unsoldCar) => {
        if (bodyType !== unsoldCar.body_type) {
          res.send({
            status: 404,
            error: 'The specified body type is not found',
          });
        } else {
          res.send({
            status: 200,
            data: [unsoldCar],
          });
        }
      });
    } else {
      res.send({
        status: 400,
        error: 'Please a specify a body type, e.g car, truck, e.t.c',
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
  static viewAllUnsoldCarsofUsedState(req, res) {
    const { state } = req.body;
    const unsoldCars = advertisements.filter(advertisment => advertisment.status === 'Available');
    const usedCars = unsoldCars.filter(unsoldCar => unsoldCar.state === 'used');
    if (state) {
      usedCars.forEach((usedCar) => {
        if (state === usedCar.state) {
          res.send({
            status: 200,
            data: [usedCar],
          });
        } else {
          res.send({
            status: 400,
            error: 'no used car record found',
          });
        }
      });
    } else {
      res.send({
        status: 400,
        error: '',
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
  static updatePricePurchaseOrder(req, res) {
    const { price } = req.body;
    const selectedAdvert = advertisements.find(advert => advert.id === Number(req.params.id));
    if (!selectedAdvert) {
      res.send({
        status: 404,
        error: 'No car sale advertisement was found with the given id',
      });
    } else {
      selectedAdvert.price = price;
      res.send({
        status: 200,
        data: [selectedAdvert],
      });
    }
  }
}
