import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserPayload, verifyJWT } from 'util/userPayload';

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
      const payload = verifyJWT(req.session.jwt);
      req.currentUser = payload;
    }
  } catch (err) {}
  next();
};
