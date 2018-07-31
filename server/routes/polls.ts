import { Router } from 'express';
import { Poll } from 'client/src/app/models/poll';

const router = Router();

let currentId = 3;
const mockPolls: Poll[] = [
  { id: 1, question: 'How many shrimps do you have to eat?' },
  { id: 2, question: 'What should we have for lunch?' },
  { id: 3, question: 'Who is the coolest in the office?' },
];

router.get('/', (req, res) => {
  res.send(mockPolls);
});

router.post('/', (req, res) => {
  const question: string = req.body.question;
  currentId += 1;
  const newPoll = { id: currentId, question: question };
  mockPolls.push(newPoll);
  res.send(newPoll);
});

export const PollsRouter: Router = router;
