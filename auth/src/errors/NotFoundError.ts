import { StandardizedError } from './StandardizedError';

export class NotFoundError extends StandardizedError {
  constructor() {
    super('not found', 404, { message: 'not found' });
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
