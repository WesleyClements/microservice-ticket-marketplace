import { Request, Response, NextFunction } from 'express';

import { UserRole } from 'db/models/User';

import { AuthorizationError } from 'errors';

export function requireAuth(...roles: UserRole[]): (req: Request, res: Response, next: NextFunction) => void;
export function requireAuth(req: Request, res: Response, next: NextFunction): void;
export function requireAuth(...args: any[]) {
  if (typeof args[0] === 'string') {
    const roles = args as UserRole[];
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.currentUser || !roles.includes(req.currentUser.role)) {
        throw new AuthorizationError('unauthorized access');
      }
      next();
    };
  } else {
    const [req, res, next] = args as [Request, Response, NextFunction];
    if (!req.currentUser) {
      throw new AuthorizationError('unauthorized access');
    }
    next();
  }
}
