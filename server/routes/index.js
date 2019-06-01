import CarsController from '../controllers/carsController';


const routes = (app) => {
  app.post('/api/v1/carSales', CarsController.addCarSaleAdvert);

  return app;
};

export default routes;
