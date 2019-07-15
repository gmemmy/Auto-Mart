import CarsController from '../controllers/carsController';
// eslint-disable-next-line import/no-named-as-default
import UserController from '../controllers/userController';
// import {
//   validateNewCarAdvert, checkPassword, validateSignup, validateSignin,
// } from '../middleware/validator';
// import authentication from '../middleware/userAuth';
import AdminController from '../controllers/adminController';
// import { userRecord, isAdmin } from '../middleware/userPermission';


const routes = (app) => {
  app.get('/car/', CarsController.viewAllUnsoldCars);
  app.get('/car/', CarsController.viewAllUnsoldCarsWithinAPriceRange);
  app.get('/api/v1/carSales/bodyType', CarsController.viewAllUnsoldCarsOfSpecificBodyType);
  app.get('/api/v1/carSales/unsold/used', CarsController.viewAllUnsoldCarsofUsedState);
  app.get('/car/:car-id', CarsController.viewSpecificCar);
  app.post('/car/', CarsController.addCarSaleAdvert);
  app.patch('/car/:car-id/price', CarsController.updatePriceCarSaleAdvert);
  app.patch('/car/:car-id/status', CarsController.updateStatusCarSaleAdvert);
  app.post('/order/', CarsController.makePurchaseOrder);
  app.patch('/order/:order-id/price', CarsController.updatePricePurchaseOrder);

  // auth routes
  app.post('/auth/signup', UserController.signUp);
  app.post('/auth/signin', UserController.signIn);

  // admin routes
  app.get('/car/', AdminController.viewAllCarRecords);
  app.get('/users/', AdminController.viewAllUsers);
  app.delete('/car/:car_id/', AdminController.deleteASpecificRecord);

  return app;
};

export default routes;
