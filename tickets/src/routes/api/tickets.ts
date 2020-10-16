import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import {
  requireAuthentication,
  validateRequest,
} from '@wkctickets/common/middleware';

import { NotFoundError } from '@wkctickets/common/errors';

import { Ticket } from 'db';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(501).send([]);
});
router.post(
  '/',
  requireAuthentication,
  [
    body('title').isString().notEmpty().withMessage('Please provide a title'),
    body('price').isFloat({ gt: 0 }).withMessage('Please provide a price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    try {
      const user = await Ticket.create({
        title,
        price,
        userId: req.currentUser!.id,
      });
      res.status(201).send(user);
    } catch (err) {
      throw err;
    }
  }
);
router.put('/', requireAuthentication, (req: Request, res: Response) => {
  res.status(501).end();
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (ticket) {
      res.status(200).send(ticket);
    }
  } catch (err) {}
  throw new NotFoundError();
});
