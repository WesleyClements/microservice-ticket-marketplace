import { ValidationError } from 'express-validator';

export interface SubError {
  message: string;
}

export class ErrorCollection extends Error {
  static fromValidationErrors(errors: ValidationError[]) {
    return new ErrorCollection(
      'Invalid data',
      400,
      ...errors.map(({ msg, param, location }) => ({ message: msg as string, param, location }))
    );
  }

  status: number;
  errors: SubError[];

  constructor(message: string, status: number, ...errors: SubError[]) {
    super(message);

    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, ErrorCollection.prototype);
  }
}
