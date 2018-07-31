import { Router } from 'express';
import { IPoll } from '../interfaces/poll';
import { getAllPolls, IPollModel, addPoll } from '../schemas/poll';

const router = Router();

const mockPolls: IPoll[] = [
  { question: 'How many shrimps do you have to eat?' },
  { question: 'What should we have for lunch?' },
  { question: 'Who is the coolest in the office?' },
];

getAllPolls().then(polls => {
  if (polls.length === 0) {
    console.log('No polls present; adding mocks...');
    const mockPollInserts: Promise<IPollModel>[] = [];
    for (const mockPoll of mockPolls) {
      mockPollInserts.push(addPoll(mockPoll));
    }
    Promise.all(mockPollInserts).then(insertedPolls => {
      console.log('Succeeded in adding mock polls.');
    }).catch(err => {
      console.log(`Failed to add polls, err: ${err}`);
    });
  }
});

router.get('/', (req, res) => {
  getAllPolls().then(polls => {
    res.send(polls);
  }).catch(err => {
    res.json({success: false, message: `Failed to fetch polls. Error: ${err}`});
  });
});

router.post('/', (req, res) => {
  // Await new db logic...

  const question: string = req.body.question;
  const newPoll = { question: question };
  addPoll(newPoll).then(addedPoll => {
    res.send(addedPoll);
  });
});

export const PollsRouter: Router = router;
