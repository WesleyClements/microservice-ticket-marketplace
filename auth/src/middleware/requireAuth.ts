import { Request, Response, NextFunction } from 'express';

import { UserRole } from '@db/models/User';

import { AuthorizationError } from '@errors';

export function requireAuth(role: UserRole): (req: Request, res: Response, next: NextFunction) => void;
export function requireAuth(req: Request, res: Response, next: NextFunction): void;
export function requireAuth(req: UserRole | Request, res?: Response, next?: NextFunction) {
  if (typeof req === 'string') {
    const role = req;
    if (!role) throw Error('role is an empty string');
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.currentUser?.role !== role) {
        throw new AuthorizationError('unauthorized access');
      }
      next();
    };
  } else {
    if (!req.currentUser) {
      throw new AuthorizationError('unauthorized access');
    }
    next!();
  }
}
