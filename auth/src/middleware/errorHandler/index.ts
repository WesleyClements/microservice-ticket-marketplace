import { Request, Response, NextFunction } from 'express';
import { StandardizedError } from './StandardizedError';

export { StandardizedError };

export const errorHandler = (err: StandardizedError | Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something went wrong', err);

  if (err instanceof StandardizedError) {
    res.status(err.status);

    res.send({
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).send({ message: err.message });
  }
};
