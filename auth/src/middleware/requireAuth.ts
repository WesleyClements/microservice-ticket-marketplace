import { Request, Response, NextFunction, RequestHandler } from 'express';

import { UserRole } from 'db/models/User';

import { AuthorizationError } from 'errors';

export function requireAuth(...roles: UserRole[]): RequestHandler;
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void;
export function requireAuth(...args: any[]) {
  if (typeof args[0] === 'string') {
    const roles = args as UserRole[];
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.currentUser || !roles.includes(req.currentUser.role)) {
        throw new AuthorizationError();
      }
      next();
    };
  } else {
    const [req, , next] = args as [Request, Response, NextFunction];
    if (!req.currentUser) {
      throw new AuthorizationError();
    }
    next();
  }
}
