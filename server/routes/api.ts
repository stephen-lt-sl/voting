import { Router } from 'express';
import { PollsRouter } from './polls';

const router = Router();

router.use('/polls', PollsRouter);

router.get('/', (req, res) => {
  res.send('api works');
});

export default router;
