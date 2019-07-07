import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import cloudinary from 'cloudinary';
import routes from './routes/index';
import doc from '../doc.json';

dotenv.config();

// Define the port variable
const port = process.env.PORT || 3000;

// Setup the express app
const app = express();


app.use(cors());

// Parse incoming requests body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// render swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
routes(app);

// cloudinary setup
cloudinary.uploader.upload();

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
