import CarsController from '../controllers/carsController';


const routes = (app) => {
  app.post('/api/v1/carSales', CarsController.addCarSaleAdvert);
  app.get('/api/v1/carSales/:id', CarsController.viewSpecificCar);

  return app;
};

export default routes;
