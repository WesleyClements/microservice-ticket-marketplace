import { Request, Response, NextFunction } from 'express';
import { StandardizedError } from '@errors/StandardizedError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof StandardizedError) {
    const { status, message, errors } = err;
    res.status(status).send({ message, errors });
  } else {
    res.status(500).send({ message: err.message });
  }
};
