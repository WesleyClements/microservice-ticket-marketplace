import { Router } from 'express';

const router = Router();

router.use('/users', require('./users').router);

export { router };
