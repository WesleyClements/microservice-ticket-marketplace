import express from 'express';
import { json } from 'body-parser';

import routes from './routes';

const PORT = 3000;

const app = express();

app.use(json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
