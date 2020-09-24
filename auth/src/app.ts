import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUser, errorHandler } from 'middleware';

import routes from 'routes';

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
app.use(errorHandler);

app.use('/', routes);
