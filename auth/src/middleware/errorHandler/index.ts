import { Request, Response, NextFunction } from 'express';
import { ErrorCollection } from './ErrorCollection';

export { ErrorCollection };

export const errorHandler = (err: ErrorCollection, req: Request, res: Response, next: NextFunction) => {
  console.log('Something went wrong', err);

  res.status(err.status);

  res.send({
    message: err.message,
    errors: err.errors,
  });
};
