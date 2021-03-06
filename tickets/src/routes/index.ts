import { Router } from 'express';

import { NotFoundError } from '@wkctickets/common/errors';

const router = Router();

router.use('/api', require('./api').router);

router.use('*', (req, res) => {
  throw new NotFoundError();
});

export default router;
