/* eslint-disable max-len */
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
      return res.status(200).json({
        status: 200,
        data: unsoldCars.rows,
      });
    }
    return res.status(200).json({
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
      return res.status(404).json({
        status: 404,
        error: 'Oops! no car found with this id.',
      });
    }
    delete specificCar.rows[0].email;
    return res.status(200).json({
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
          return res.status(200).json({
            status: 200,
            data: [unsoldCar],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'No car record found within the specified range',
        });
      });
    } else {
      res.status(400).json({
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
      return res.status(200).json({
        status: 200,
        data: carsByBodyType.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Sorry there are no cars with the specified body type',
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
  static async viewAllUnsoldCarsofState(req, res) {
    const carsOfUsedState = await CarModel.getUsedState(req.body.state);
    if (req.body.state !== 'used' && req.body.state !== 'new') {
      return res.status(400).json({
        status: 400,
        error: 'Unauthorized! You can only view cars that are of state used or new',
      });
    } if (carsOfUsedState.rowCount >= 1) {
      return res.status(200).json({
        status: 200,
        data: carsOfUsedState.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Sorry there are no cars with the specified car state',
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
    // Retrieve all errors from express validator
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
      carSale.manufacturer = carSale.manufacturer;
      carSale.model = carSale.model;
      carSale.price = carSale.price;
      carSale.state = carSale.state;
      carSale.status = 'Available';
      carSale.body_type = carSale.body_type;
      carSale.img_url = [];
      const newAdvert = await CarModel.addCar(carSale);
      return res.status(201).json({
        status: 201,
        data: newAdvert.rows[0],
      });
    }
    return res.status(400).json({
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
    const payload = {
      id: req.params.id,
      field_name: 'price',
      data: req.body.price,
    };
    const updatePrice = await CarModel.patch(payload);
    return res.status(200).json({
      status: 200,
      data: updatePrice.rows[0],
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
    const payload = {
      id: Number(req.params.id),
      field_name: 'status',
      data: status,
    };
    const updateStatus = await CarModel.patch(payload);
    if (updateStatus.rows.length === 1) {
      return res.status(200).json({
        status: 200,
        data: updateStatus.rows[0],
      });
    }
    return res.status(500).json({
      status: 500,
      error: 'Sorry! Something happened.',
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
    purchaseOrder.amount = purchaseOrder.amount;
    purchaseOrder.car_id = purchaseOrder.car_id;
    const newPurchaseOrder = await CarModel.addOrder(purchaseOrder);
    return res.status(201).json({
      status: 201,
      data: newPurchaseOrder.rows[0],
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
    try {
      const payload = {
        id: req.params.id,
        field_name: 'new_price_offered',
        data: req.body.price,
      };
      const updateOrderPrice = await CarModel.Orderpatch(payload);
      if (updateOrderPrice.rows.length === 1) {
        return res.status(200).json({
          status: 200,
          data: updateOrderPrice.rows[0],
        });
      } return res.status(500).json({
        status: 500,
        error: 'Sorry! Something happened.',
      });
    } catch (error) {
      return error;
    }
  }
}
