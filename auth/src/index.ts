import express from 'express';
import { json } from 'body-parser';

import '@db';

import { errorHandler } from '@middleware/errorHandler';

const PORT = 3000;

const app = express();

app.use(json());

app.use('/', require('./routes').router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
