import { Router } from 'express';
import { Poll } from 'client/src/app/models/poll';

const router = Router();

const mockPolls: Poll[] = [
  { id: 1, question: 'How many shrimps do you have to eat?' },
  { id: 2, question: 'What should we have for lunch?' },
  { id: 3, question: 'Who is the coolest in the office?' },
];

router.get('/all', (req, res) => {
  res.send(mockPolls);
});

export const PollsRouter: Router = router;
