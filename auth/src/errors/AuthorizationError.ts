import { StandardizedError } from './StandardizedError';

export class AuthorizationError extends StandardizedError {
  constructor(message: string) {
    super(message, 401, { message });
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
