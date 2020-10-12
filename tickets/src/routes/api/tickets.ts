import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth, validateRequest } from '@wkctickets/common/middleware';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(501).send([]);
});
router.post(
  '/',
  requireAuth,
  [
    body('title').isString().notEmpty().withMessage('Please privide a title'),
    body('price').isString().notEmpty().withMessage('Please privide a price'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(501).end();
  }
);
router.put('/', requireAuth, (req: Request, res: Response) => {
  res.status(501).end();
});
router.get('/:id', (req: Request, res: Response) => {
  res.status(501).send({});
});
