import { Router } from 'express';

export const router = Router();

router.use('/users', require('./users').router);
