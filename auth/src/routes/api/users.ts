import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import {
  requireAuthentication,
  validateRequest,
} from '@wkctickets/common/middleware';

import { MongoError } from 'mongodb';
import { BadRequestError } from '@wkctickets/common/errors';

import { User } from 'db';

import { createJWT } from '@wkctickets/common/auth';

export const router = Router();

router.get('/currentuser', (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('password must be more than 6 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.create({ role: 'default', email, password });
      req.session = {
        jwt: createJWT(user.getJWTPayload()),
      };

      res.status(201).json(user);
    } catch (err) {
      if (err instanceof MongoError && err.code === 11000) {
        throw new BadRequestError('email in use');
      }
      throw new Error('internal error');
    }
  }
);

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('you must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      throw new Error('internal error');
    }
    if (user && (await user.comparePassword(password))) {
      req.session = {
        jwt: createJWT(user.getJWTPayload()),
      };

      res.status(200).json(user);
    } else {
      throw new BadRequestError('invalid credentials');
    }
  }
);

router.post('/signout', requireAuthentication, (req, res) => {
  req.session = null;
  res.status(200).end();
});
