import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { ErrorCollection } from '../../middleware/errorHandler';

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw ErrorCollection.fromValidationErrors(errors.array());
    }
    const { email, password } = req.body;

    console.log(`Creating user: ${email}, ${password}`, 'sdsdds');

    res.status(201).json({});
  }
);

router.post('/signin', (req, res) => {});

router.post('/signout', (req, res) => {});

export { router };
