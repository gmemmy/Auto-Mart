import CarsController from '../controllers/carsController';
import UserController from '../controllers/userController';
import {
  checkPassword, errorSignupBody, errorSigninBody, validateGetCarByBodyType, errorNewCar,
  errorNewOrder, errorUpdatePriceOfCar, errorUpdateStatusOfCar, errorUpdatePriceOfOrder,
  errorDeleteCar, validateNewCarAdvert, validateSignup, validateSignin,
} from '../middleware/validator';
import AdminController from '../controllers/adminController';
import authentication from '../middleware/userAuth';
import { userRecord, isAdmin } from '../middleware/userPermission';


const routes = (app) => {
  app.get('/api/v1/car/', authentication, CarsController.viewAllUnsoldCars);
  app.get('/api/v1/car/price-range', authentication, CarsController.viewAllUnsoldCarsWithinAPriceRange);
  app.get('/api/v1/car/body-type', authentication, validateGetCarByBodyType, CarsController.viewAllUnsoldCarsOfSpecificBodyType);
  app.get('/api/v1/car/state', authentication, CarsController.viewAllUnsoldCarsofState);
  app.get('/api/v1/car/:id', authentication, CarsController.viewSpecificCar);
  app.post('/api/v1/car/', authentication, errorNewCar, validateNewCarAdvert, CarsController.addCarSaleAdvert);
  app.patch('/api/v1/car/:id/price', authentication, userRecord, errorUpdatePriceOfCar, CarsController.updatePriceCarSaleAdvert);
  app.patch('/api/v1/car/:id/status', authentication, userRecord, errorUpdateStatusOfCar, CarsController.updateStatusCarSaleAdvert);
  app.post('/api/v1/order/', authentication, errorNewOrder, CarsController.makePurchaseOrder);
  app.patch('/api/v1/order/:id/price', authentication, userRecord, errorUpdatePriceOfOrder, CarsController.updatePricePurchaseOrder);

  // auth routes
  app.post('/api/v1/auth/signup', errorSignupBody, validateSignup, checkPassword, UserController.signUp);
  app.post('/api/v1/auth/signin', errorSigninBody, validateSignin, UserController.signIn);

  // admin routes
  app.get('/api/v1/admin', authentication, isAdmin, AdminController.viewAllCarRecords);
  app.get('/api/v1/admin/users', authentication, isAdmin, AdminController.viewAllUsers);
  app.delete('/api/v1/admin/:id/', authentication, isAdmin, errorDeleteCar, AdminController.deleteASpecificRecord);

  return app;
};

export default routes;
