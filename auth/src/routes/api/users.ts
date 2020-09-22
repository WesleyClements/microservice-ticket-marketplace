import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { MongoError } from 'mongodb';
import { BadRequestError, RequestValidationError } from '@errors';

import { User } from '@db';

const router = Router();

router.get('/currentuser', (req, res) => {
  res.send('Hi there');
});

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be more than 6 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    try {
      const user = await User.create({ email, password });
      req.session = {
        jwt: jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!),
      };

      res.status(201).json(user);
    } catch (err) {
      if (err instanceof MongoError && err.code === 11000) {
        throw new BadRequestError('Email in use');
      }
      throw new Error('Internal Error');
    }
  }
);

router.post('/signin', (req, res) => {});

router.post('/signout', (req, res) => {});

export { router };
