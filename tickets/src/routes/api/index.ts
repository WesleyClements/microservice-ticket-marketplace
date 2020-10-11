import { Router } from 'express';

export const router = Router();

router.use('/tickets', require('./tickets').router);
