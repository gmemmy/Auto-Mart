import createTables from '../models/createTables';
import dropTables from '../models/dropTables';
import routes from './index';

routes.get('/api/v1/migrate', async (req, res) => {
  const response = await dropTables();
  if (!response) {
    res.send({
      status: 500,
      error: 'Sorry we could not migrate database, please try again.',
    });
  }

  const migrate = await createTables();
  if (!migrate) {
    res.send({
      status: 500,
      error: 'Sorry we could not migrate database, please try again',
    });
  } else {
    res.send({
      status: 200,
      error: 'Your tables were created and migrated successfully',
    });
  }
});
