import CarsController from '../controllers/carsController';
// eslint-disable-next-line import/no-named-as-default
import UserController from '../controllers/userController';


const routes = (app) => {
  app.post('/api/v1/carSales', CarsController.addCarSaleAdvert);
  app.get('/api/v1/carSales', CarsController.viewAllUnsoldCars);
  app.get('/api/v1/carSales/:id', CarsController.viewSpecificCar);
  app.post('/api/v1/carSales/purchase', CarsController.makePurchaseOrder);

  // auth routes
  app.post('api/v1/carSales/signup', UserController.signUp);

  return app;
};

export default routes;
