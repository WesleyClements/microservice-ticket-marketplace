export interface ErrorItem {
  message: string;
}

export class StandardizedError extends Error {
  status: number;
  errors: ErrorItem[];

  constructor(message: string, status: number, ...errors: ErrorItem[]) {
    super(message);

    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, StandardizedError.prototype);
  }
}
