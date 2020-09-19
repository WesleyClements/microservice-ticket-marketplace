import { ValidationError } from 'express-validator';

export interface ErrorItem {
  message: string;
}

export class StandardizedError extends Error {
  static fromValidationErrors(errors: ValidationError[]) {
    return new StandardizedError(
      'Invalid data',
      400,
      ...errors.map(({ msg, param, location }) => ({ message: msg as string, param, location }))
    );
  }

  status: number;
  errors: ErrorItem[];

  constructor(message: string, status: number, ...errors: ErrorItem[]) {
    super(message);

    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, StandardizedError.prototype);
  }
}
