import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import '@db';

import { currentUser, errorHandler } from '@middleware';

const PORT = 3000;

if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    keys: ['jwt'],
    signed: false,
    secure: true,
  })
);

app.use(currentUser);

app.use('/', require('./routes').router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
