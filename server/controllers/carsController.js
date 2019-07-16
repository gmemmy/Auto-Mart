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
    const unsoldCars = await CarModel.getAll({ status: 'Available' });
    if (unsoldCars.rowCount >= 1) {
      return res.status(200).send({
        status: 200,
        data: unsoldCars.rows,
      });
    }
    return res.status(204).send({
      status: 204,
      data: [],
    });
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
      return res.status(404).send({
        status: 404,
        error: 'Oops! no car found with this id.',
      });
    }
    delete specificCar.rows[0].email;
    return res.status(200).send({
      status: 200,
      data: specificCar.rows[0],
    });
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
          return res.status(200).send({
            status: 200,
            data: [unsoldCar],
          });
        }
        return res.status(404).send({
          status: 404,
          error: 'No car record found within the specified range',
        });
      });
    } else {
      res.status(400).send({
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

  static async viewAllUnsoldCarsOfSpecificBodyType(req, res) {
    const carsByBodyType = await CarModel.getBodyType(req.body.body_type);
    if (carsByBodyType.rowCount >= 1) {
      return res.status(200).send({
        status: 200,
        data: carsByBodyType.rows,
      });
    }
    return res.status(204).send({
      status: 204,
      message: 'Sorry there are no cars with the specified body type',
      data: [],
    });
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
  static async viewAllUnsoldCarsofUsedState(req, res) {
    const carsOfUsedState = await CarModel.getUsedState(req.body.state);
    if (req.body.state !== 'used') {
      return res.status(400).send({
        status: 400,
        error: 'Unauthorized! You can only view cars that are of state used',
      });
    } if (carsOfUsedState.rowCount >= 1) {
      return res.status(200).send({
        status: 200,
        data: carsOfUsedState.rows,
      });
    }
    return res.status(204).send({
      status: 204,
      message: 'Sorry there are no cars with the specified car state',
      data: [],
    });
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
      carSale.manufacturer = carSale.manufacturer;
      carSale.model = carSale.model;
      carSale.email = carSale.email;
      carSale.price = carSale.price;
      carSale.state = carSale.state;
      carSale.status = 'Available';
      carSale.body_type = carSale.body_type;
      carSale.img_url = [];
      const newAdvert = await CarModel.addCar(carSale);
      return res.status(201).send({
        status: 201,
        data: newAdvert.rows,
      });
    }
    return res.status(400).send({
      status: 400,
      error: errors,
    });
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
        id: Number(req.params.id),
        field_name: 'price',
        data: req.body.price,
      };
      if (Number.isNaN(req.body.price)) {
        return res.status(400).send({
          status: 400,
          message: 'Please input a valid request',
        });
      }
      const updatePrice = await CarModel.patch(payload);
      if (updatePrice.rowCount) {
        return res.status(200).send({
          status: 200,
          data: updatePrice.rows,
          message: 'Successfully updated price of the car advert',
        });
      }
      return res.status(500).send({
        status: 500,
        message: 'Sorry, something happened.',
      });
    }
    return res.status(400).send({
      status: 400,
      error: errors,
    });
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
    const { status } = req.body;
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      const payload = {
        id: req.params.id,
        field_name: 'status',
        data: status,
      };
      const updateStatus = await CarModel.patch(payload);
      return res.status(200).send({
        status: 200,
        data: updateStatus.rows,
        message: 'Successfully updated the status of the car advert',
      });
    }
    return res.status(400).send({
      status: 400,
      error: errors,
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
  static async makePurchaseOrder(req, res) {
    // eslint-disable-next-line no-shadow
    const purchaseOrder = req.body;
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      purchaseOrder.buyer = Number(req.user.id);
      purchaseOrder.car_id = purchaseOrder.car_id;
      purchaseOrder.price = purchaseOrder.price;
      purchaseOrder.status = 'Pending';
      purchaseOrder.price_offered = purchaseOrder.price_offered;
      const newPurchaseOrder = await CarModel.addOrder(purchaseOrder);
      return res.status(201).send({
        status: 201,
        data: newPurchaseOrder.rows[0],
        message: 'Successfully created a new car purchase order',
      });
    }
    return res.status(400).send({
      status: 400,
      error: errors,
    });
  }

  /**
  * @description - Update the price of a purchase order
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
        field_name: 'price',
        data: req.body.price,
      };
      const updateOrderPrice = await CarModel.patch(payload);
      return res.status(200).send({
        status: 200,
        data: updateOrderPrice.rows,
        message: 'Successfully updated price of the purchase order',
      });
    }
    return res.status(400).send({
      status: 400,
      error: errors,
    });
  }
}
