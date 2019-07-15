import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.send({
          status: 401,
          error: 'Token is invalid, please sign in',
        });
      }
      // save to request body
      req.user = decoded;
      return next();
    });
  } else {
    res.send({
      status: 401,
      error: 'Unauthorized! you have to sign in first',
    });
  }
};

export default authentication;