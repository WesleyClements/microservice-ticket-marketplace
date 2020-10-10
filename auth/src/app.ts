import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUser, errorHandler } from '@wkctickets/common/middleware';

import routes from 'routes';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    keys: ['jwt'],
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use('/', routes);

app.use(errorHandler);

export default app;
