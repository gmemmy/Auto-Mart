import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authentication = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.send({
          status: 401,
          error: 'Token is invalid, please sign in',
        });
      }
      // save to request body
      req.decoded = decoded;
      req.user = decoded;
      return next();
    });
  } else {
    res.send({
      status: 401,
      error: 'Unauthorized! you have to login first',
    });
  }
};

export default authentication;
