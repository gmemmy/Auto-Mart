import CarsController from '../controllers/carsController';
import userController from '../controllers/userController';
import validateSignup from '../middleware/validator';


const routes = (app) => {
  app.post('/api/v1/carSales', CarsController.addCarSaleAdvert);
  app.get('/api/v1/carSales', CarsController.viewAllUnsoldCars);
  app.get('/api/v1/carSales/:id', CarsController.viewSpecificCar);
  app.post('/api/v1/carSales/purchase', CarsController.makePurchaseOrder);

  // auth routes
  app.post('api/v1/carSales/signup', validateSignup, userController.signup);

  return app;
};

export default routes;
