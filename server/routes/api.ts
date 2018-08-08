import { Router } from 'express';
import { PollsRouter } from './polls';
import { VotesRouter } from './votes';

const router = Router();

router.use('/polls', PollsRouter);
router.use('/votes', VotesRouter);

router.get('/', (req, res) => {
  res.send('api works');
});

export default router;
