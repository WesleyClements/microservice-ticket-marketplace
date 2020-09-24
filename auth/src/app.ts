import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import '@db';

import { currentUser, errorHandler } from 'middleware';

export const app = express();

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
