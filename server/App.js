import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

// Setup the express app
const app = express();

// Define the port variable
const port = process.env.PORT || 3000;

// Parse incoming requests body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

// wildcard route
app.all('*', (req, res) => {
  res.send({
    status: 404,
    error: 'This page does not exist',
  });
});

// Setup server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port ${port}!`);
});

export default app;
