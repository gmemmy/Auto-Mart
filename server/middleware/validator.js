import ExpressValidator from 'express-validator/check';

const { check } = ExpressValidator;

export const validateNewCarAdvert = [
  check('price')
    .isNumeric().withMessage('price must be only numeric characters')
    .isLength({ min: 5 })
    .withMessage('price must be at least 5 characters long'),
];

export const checkPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.send({
      status: 400,
      error: 'Password and Confirm Password do not match',
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
