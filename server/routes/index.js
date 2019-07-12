import CarsController from '../controllers/carsController';
// eslint-disable-next-line import/no-named-as-default
import UserController from '../controllers/userController';
import {
  validateNewCarAdvert, checkPassword, validateSignup, validateSignin,
} from '../middleware/validator';
import authentication from '../middleware/userAuth';
import AdminController from '../controllers/adminController';
import { userRecord, isAdmin } from '../middleware/userPermission';


const routes = (app) => {
  app.get('/api/v1/carSales/', CarsController.viewAllUnsoldCars);
  app.get('/api/v1/carSales/priceRange', CarsController.viewAllUnsoldCarsWithinAPriceRange);
  app.get('/api/v1/carSales/bodyType', CarsController.viewAllUnsoldCarsOfSpecificBodyType);
  app.get('/api/v1/carSales/unsold/used', CarsController.viewAllUnsoldCarsofUsedState);
  app.get('/api/v1/carSales/:id', CarsController.viewSpecificCar);
  app.post('/api/v1/carSales/', authentication, validateNewCarAdvert, CarsController.addCarSaleAdvert);
  app.patch('/api/v1/carSales/:id/price', authentication, userRecord, CarsController.updatePriceCarSaleAdvert);
  app.patch('/api/v1/carSales/:id/status', authentication, userRecord, CarsController.updateStatusCarSaleAdvert);
  app.post('/api/v1/carSales/purchase', authentication, CarsController.makePurchaseOrder);
  app.patch('/api/v1/Carsales/:id/updatePurchase', authentication, userRecord, CarsController.updatePricePurchaseOrder);

  // auth routes
  app.post('/api/v1/auth/signup', validateSignup, checkPassword, UserController.signUp);
  app.post('/api/v1/auth/signin', validateSignin, UserController.signIn);

  // admin routes
  app.get('/api/v1/admin', authentication, isAdmin, AdminController.viewAllCarRecords);
  app.get('/api/v1/admin/users', authentication, isAdmin, AdminController.viewAllUsers);
  app.delete('/api/v1/admin/:id', authentication, isAdmin, AdminController.deleteASpecificRecord);

  return app;
};

export default routes;
