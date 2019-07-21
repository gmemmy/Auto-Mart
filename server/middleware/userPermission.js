/* eslint-disable import/prefer-default-export */
import carModel from '../models/carAdsModel';

// Checks that a user owns a record before doing anything with the record
export const userRecord = async (req, res, next) => {
  const check = await carModel.getById(req.params.id);
  if (check.rowCount === 1) {
    if (check.rows[0].owner === req.user.id) {
      return next();
    }
    return res.send({
      status: 402,
      error: 'You are not authorized to perform this operation',
    });
  }
  return res.send({
    status: 404,
    error: 'No car was found with the specified id!',
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.is_admin === true) {
    return next();
  }
  return res.send({
    status: 402,
    error: 'Unauthorized! Only the admin can perform this operation',
  });
};
