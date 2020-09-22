import { Request, Response, NextFunction } from 'express';

import { StandardizedError } from '@errors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof StandardizedError) {
    const { status, message, errors } = err;
    console.error(`Error: ${message}`);
    res.status(status).send({ errors });
  } else {
    res.status(500).send({ message: err.message });
  }
};
