import { ValidationError } from 'express-validator';

import { StandardizedError } from './StandardizedError';

export class RequestValidationError extends StandardizedError {
  constructor(errors: ValidationError[]) {
    super(
      'Invalid data',
      400,
      ...errors.map(({ msg, param, location }) => ({ message: msg as string, param, location }))
    );
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
