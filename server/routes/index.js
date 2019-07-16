import CarsController from '../controllers/carsController';
// eslint-disable-next-line import/no-named-as-default
import UserController from '../controllers/userController';
import {
  errorSignupBody, errorSigninBody, errorNewCar, errorNewOrder,
  errorUpdatePriceOfCar, errorUpdateStatusOfCar, errorUpdatePriceOfOrder,
} from '../middleware/validator';
import authentication from '../middleware/userAuth';
import AdminController from '../controllers/adminController';
// import { userRecord, isAdmin } from '../middleware/userPermission';


const routes = (app) => {
  app.get('/car/', authentication, CarsController.viewAllUnsoldCars);
  app.get('/car/', CarsController.viewAllUnsoldCarsWithinAPriceRange);
  app.get('/api/v1/carSales/bodyType', CarsController.viewAllUnsoldCarsOfSpecificBodyType);
  app.get('/api/v1/carSales/unsold/used', CarsController.viewAllUnsoldCarsofUsedState);
  app.get('/car/:car-id', authentication, CarsController.viewSpecificCar);
  app.post('/car/', errorNewCar, CarsController.addCarSaleAdvert);
  app.patch('/car/:car-id/price', authentication, errorUpdatePriceOfCar, CarsController.updatePriceCarSaleAdvert);
  app.patch('/car/:car-id/status', authentication, errorUpdateStatusOfCar, CarsController.updateStatusCarSaleAdvert);
  app.post('/order/', errorNewOrder, CarsController.makePurchaseOrder);
  app.patch('/order/:order-id/price', authentication, errorUpdatePriceOfOrder, CarsController.updatePricePurchaseOrder);

  // auth routes
  app.post('/auth/signup', errorSignupBody, UserController.signUp);
  app.post('/auth/signin', errorSigninBody, UserController.signIn);

  // admin routes
  app.get('/api/v1/admin', AdminController.viewAllCarRecords);
  app.get('/api/v1/admin/users', AdminController.viewAllUsers);
  app.delete('/car/:car_id/', AdminController.deleteASpecificRecord);

  return app;
};

export default routes;
