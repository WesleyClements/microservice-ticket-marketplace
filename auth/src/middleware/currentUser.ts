import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserRole } from '@db/models/User';

interface UserPayload {
  id: string;
  role?: UserRole;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session?.jwt) {
      const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
      req.currentUser = payload;
    }
  } catch (err) {}
  next();
};
