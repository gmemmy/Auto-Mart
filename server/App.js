import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

// Setup the express app
const app = express();

// Define the port variable
const port = process.env.PORT || 3000;

// Parse incoming requests body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Setup server
routes(app).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port ${port}!`);
});

export default app;
