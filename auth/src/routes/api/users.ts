import { Router } from 'express';

const router = Router();

router.get('/currentuser', (req, res) => {
  res.send('Hi there');
});

router.post('/signup', (req, res) => {});

router.post('/signin', (req, res) => {});

router.post('/signout', (req, res) => {});

export default router;
