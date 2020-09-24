import jwt from 'jsonwebtoken';

import { UserRole } from 'db/models/User';

export interface UserPayload {
  id: string;
  role: UserRole;
  email: string;
}

export const createJWT = (payload: UserPayload) => {
  return jwt.sign(payload, process.env.JWT_KEY!);
};

export const verifyJWT = (token: string): UserPayload => {
  return jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
};
