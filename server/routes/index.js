import CarsController from '../controllers/carsController';
import UserController from '../controllers/userController';
import {
  checkPassword, errorSignupBody, errorSigninBody, errorNewCar, errorNewOrder,
  errorUpdatePriceOfCar, errorUpdateStatusOfCar, errorUpdatePriceOfOrder, errorDeleteCar,
} from '../middleware/validator';
import AdminController from '../controllers/adminController';
import authentication from '../middleware/userAuth';
import { userRecord, isAdmin } from '../middleware/userPermission';


const routes = (app) => {
  app.get('/api/v1/car/', authentication, CarsController.viewAllUnsoldCars);
  app.get('/api/v1/car/price-range', authentication, CarsController.viewAllUnsoldCarsWithinAPriceRange);
  app.get('/api/v1/car/body-type', authentication, CarsController.viewAllUnsoldCarsOfSpecificBodyType);
  app.get('/api/v1/car/used', authentication, CarsController.viewAllUnsoldCarsofUsedState);
  app.get('/api/v1/car/:id', authentication, CarsController.viewSpecificCar);
  app.post('/api/v1/car/', authentication, errorNewCar, CarsController.addCarSaleAdvert);
  app.patch('/car/:id/price', authentication, userRecord, errorUpdatePriceOfCar, CarsController.updatePriceCarSaleAdvert);
  app.patch('/car/:id/status', authentication, userRecord, errorUpdateStatusOfCar, CarsController.updateStatusCarSaleAdvert);
  app.post('/order/', authentication, errorNewOrder, CarsController.makePurchaseOrder);
  app.patch('/order/:id/price', authentication, userRecord, errorUpdatePriceOfOrder, CarsController.updatePricePurchaseOrder);

  // auth routes
  app.post('/api/v1/auth/signup', errorSignupBody, checkPassword, UserController.signUp);
  app.post('/api/v1/auth/signin', errorSigninBody, UserController.signIn);

  // admin routes
  app.get('/api/v1/admin', isAdmin, AdminController.viewAllCarRecords);
  app.get('/api/v1/admin/users', isAdmin, AdminController.viewAllUsers);
  app.delete('/api/v1/admin/:id/', isAdmin, errorDeleteCar, AdminController.deleteASpecificRecord);

  return app;
};

export default routes;
