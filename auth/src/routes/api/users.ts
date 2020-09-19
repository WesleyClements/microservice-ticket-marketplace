import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
      const result = await User.create({ email, password });
      res.status(201).json({ id: result._id });
    } catch (err) {
      if (/E11000/i.test(err.message)) {
        throw new BadRequestError('Email in use');
      }
      throw new Error('Internal Error');
    }
  }
);

router.post('/signin', (req, res) => {});

router.post('/signout', (req, res) => {});

export { router };
