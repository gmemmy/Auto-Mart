/* eslint-disable camelcase */
import ExpressValidator from 'express-validator/check';

const { check } = ExpressValidator;

export const validateNewCarAdvert = [
  check('price')
    .isNumeric().withMessage('price must be only numeric characters')
    .isLength({ min: 5 })
    .withMessage('price must be at least 5 characters long'),
];

// Validate request body and throw relevant error messages

export const checkPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.send({
      status: 400,
      error: 'Password and Confirm Password do not match',
    });
  } return next();
};

export const errorSignupBody = (req, res, next) => {
  const {
    email, first_name, last_name, password, address,
  } = req.body;
  if (!password || !first_name || !last_name || !email || !address) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

export const errorSigninBody = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

// Validation for car body object

export const errorNewCar = (req, res, next) => {
  const {
    manufacturer, model, price, state, status, body_type, img_url,
  } = req.body;
  if (!manufacturer || !model || !price || !state || !status || !body_type || !img_url) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

export const errorNewOrder = (req, res, next) => {
  const {
    car_id, amount,
  } = req.body;
  if (!car_id || !amount) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

export const errorUpdatePriceOfCar = (req, res, next) => {
  const { price } = req.body;
  if (!price || price === undefined) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

export const errorUpdateStatusOfCar = (req, res, next) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

export const errorUpdatePriceOfOrder = (req, res, next) => {
  const { price } = req.body;
  if (!price) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

export const errorDeleteCar = (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill in valid data',
    });
  } return next();
};

// eslint-disable-next-line import/prefer-default-export
export const validateSignup = [
  check('email')
    .isEmail().withMessage('Email must be alphanumeric characters!')
    .isLength({ min: 8, max: 40 })
    .withMessage('Email must not be less than 8 characters long and not more than 20!'),

  check('password')
    .isString().withMessage('Password must be alphanumeric characters!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must not be less than 8 characters long and not more than 20'),

  check('firstName')
    .isString().withMessage('First Name must be alphabetical characters!')
    .isLength({ min: 2, max: 40 })
    .withMessage('First Name must not be less than 2 characters long and not more than 40'),

  check('lastName')
    .isString().withMessage('Last Name must be alphabetical characters!')
    .isLength({ min: 2, max: 40 })
    .withMessage('Last Name must not be less than 2 characters long and not more than 40'),

  check('password')
    .isString().withMessage('Password must be alphanumeric characters!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long!'),
];

export const validateSignin = [
  check('email')
    .isString().withMessage('Email must be alpanumeric characters')
    .isLength({ min: 4, max: 20 })
    .withMessage('Email must not be less than 8 characters long and not more than 20!!'),

  check('password')
    .isString().withMessage('Password must be alphanumeric characters!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must not be less than 8 characters long and not more than 20'),

];
