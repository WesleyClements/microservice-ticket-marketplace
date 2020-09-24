import { StandardizedError } from './StandardizedError';

export class AuthorizationError extends StandardizedError {
  constructor() {
    super('not authorized', 401, { message: 'not authorized' });
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
