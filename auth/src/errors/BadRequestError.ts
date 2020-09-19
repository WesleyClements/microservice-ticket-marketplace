import { StandardizedError } from './StandardizedError';

export class BadRequestError extends StandardizedError {
  constructor(message: string) {
    super(message, 400, { message });
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
