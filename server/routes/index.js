import CarsController from '../controllers/carsController';
// eslint-disable-next-line import/no-named-as-default
import UserController from '../controllers/userController';
import {
  validateNewCarAdvert, checkPassword, validateSignup, validateSignin,
} from '../middleware/validator';
import AdminController from '../controllers/adminController';


const routes = (app) => {
  app.get('/api/v1/carSales/', CarsController.viewAllUnsoldCars);
  app.get('/api/v1/carSales/priceRange', CarsController.viewAllUnsoldCarsWithinAPriceRange);
  app.get('/api/v1/carSales/:id', CarsController.viewSpecificCar);
  app.post('/api/v1/carSales/', validateNewCarAdvert, CarsController.addCarSaleAdvert);
  app.patch('/api/v1/carSales/:id/price', CarsController.updatePriceCarSaleAdvert);
  app.patch('/api/v1/carSales/:id/status', CarsController.updateStatusCarSaleAdvert);
  app.post('/api/v1/carSales/purchase', CarsController.makePurchaseOrder);
  app.patch('/api/v1/Carsales/:id/updatePurchase', CarsController.updatePricePurchaseOrder);

  // auth routes
  app.post('/api/v1/auth/signup', checkPassword, validateSignup, UserController.signUp);
  app.post('/api/v1/auth/signin', validateSignin, UserController.signIn);

  // admin routes
  app.get('/api/v1/admin', AdminController.viewAllCarRecords);
  app.get('/api/v1/admin/users', AdminController.viewAllUsers);
  app.delete('/api/v1/admin/:id', AdminController.deleteASpecificRecord);

  return app;
};

export default routes;
