import { Request, Response, NextFunction } from 'express';
import { ErrorCollection } from './ErrorCollection';

export { ErrorCollection };

export const errorHandler = (err: ErrorCollection | Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something went wrong', err);

  if (err instanceof ErrorCollection) {
    res.status(err.status);

    res.send({
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).send({ message: err.message });
  }
};
