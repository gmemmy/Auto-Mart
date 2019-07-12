import ExpressValidator from 'express-validator/check';
import advertisements from '../data/carAds';
import CarModel from '../models/carAdsModel';

const { validationResult } = ExpressValidator;

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
        status: 204,
        data: [],
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
  static async viewSpecificCar(req, res) {
    const specificCar = await CarModel.getById(Number(req.params.id));
    if (specificCar.rowCount !== 1) {
      res.send({
        status: 404,
        error: 'Oops! no car found with this id.',
      });
    } else {
      res.send({
        status: 200,
        data: [specificCar.rows[0]],
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
* @description - View all unsold cars with a specific body type
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
* @description - View all unsold cars that are used
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
  static async addCarSaleAdvert(req, res) {
    const carSale = req.body;
    // Get all the errors from express validator
    const errors = validationResult(req).array().map(error => error.msg);
    // pick last car advert from the car adverts array, check it's id
    // the last record's id + 1 is the new record's id
    if (errors.length < 1) {
      carSale.owner = req.user.id;
      carSale.createdOn = new Date().toISOString().slice(0, 19).replace('T', ' ');
      carSale.state = carSale.state;
      carSale.status = carSale.status;
      carSale.price = carSale.price;
      carSale.manufacturer = carSale.manufacturer;
      carSale.model = carSale.model;
      carSale.bodyType = carSale.bodyType;
      const newAdvert = await CarModel.addCar(carSale);

      res.send({
        status: 201,
        data: [
          {
            id: newAdvert.rows[0].id,
            message: 'Successfully created a new car sale advertisement',
          },
        ],
      });
    } else {
      res.send({
        status: 400,
        error: errors,
      });
    }
  }

  /**
  * @description - Update the price of a car sale advertisment by id
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
  *
  * @returns {object} Class instance
  */
  static async updatePriceCarSaleAdvert(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const payload = {
        id: req.params.id,
        fieldName: 'price',
        data: req.body.price,
      };
      const updatePrice = await CarModel.patch(payload);
      req.send({
        status: 200,
        data: [{
          id: updatePrice.rows[0].id,
          message: 'Successfully updated price of the car advert',
        }],
      });
    } else {
      res.send({
        status: 400,
        error: errors,
      });
    }
  }

  /**
  * @description - Update the status of a car sale advertisment by id
  * @static
  *
  * @param {object} req - HTTP Request
  * @param {object} res - HTTP Response
  *
  * @memberof CarsController
  *
  * @returns {object} Class instance
  */
  static async updateStatusCarSaleAdvert(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const payload = {
        id: req.params.id,
        fieldName: 'status',
        data: req.body.status,
      };
      const updateStatus = await CarModel.patch(payload);
      req.send({
        status: 200,
        data: [{
          id: updateStatus.rows[0].id,
          message: 'Successfully updated the status of the car advert',
        }],
      });
    } else {
      res.send({
        status: 400,
        error: errors,
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
  static async makePurchaseOrder(req, res) {
    // eslint-disable-next-line no-shadow
    const purchaseOrder = req.body;
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      purchaseOrder.buyer = req.user.id;
      purchaseOrder.carId = req.params.id;
      purchaseOrder.status = purchaseOrder.status;
      purchaseOrder.status = purchaseOrder.status;
      const newPurchaseOrder = await CarModel.addCar(purchaseOrder);

      res.send({
        status: 201,
        data: [
          {
            id: newPurchaseOrder.rows[0].id,
            message: 'Successfully created a new car purchase order',
          },
        ],
      });
    } else {
      res.send({
        status: 400,
        error: errors,
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
  static async updatePricePurchaseOrder(req, res) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const payload = {
        id: req.params.id,
        fieldName: 'price',
        data: req.body.price,
      };
      const updateOrderPrice = await CarModel.patch(payload);
      req.send({
        status: 200,
        data: [{
          id: updateOrderPrice.rows[0].id,
          message: 'Successfully updated price of the purchase order',
        }],
      });
    } else {
      res.send({
        status: 400,
        error: errors,
      });
    }
  }
}
