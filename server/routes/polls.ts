import { Router } from 'express';
import { IPoll } from '../interfaces/poll';
import { getAllPolls, IPollModel, addPoll, Poll } from '../schemas/poll';
import { PollOption, getOptionsForPoll } from '../schemas/poll-option';
import { ObjectId } from '../../node_modules/@types/bson';

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

router.get('/:pollId', (req, res) => {
  const pollId: ObjectId = req.params.pollId;
  const findPoll = Poll.findById(pollId).exec();
  const findPollOptions = getOptionsForPoll(pollId);
  Promise.all([findPoll, findPollOptions]).then(([foundPoll, foundPollOptions]) => {
    if (foundPoll) {
      foundPoll.options = foundPollOptions;
      res.send(foundPoll);
    } else {
      res.sendStatus(404);
    }
  }).catch(err => {
    res.json({success: false, message: `Failed to fetch polls. Error: ${err}`});
  });
});

router.post('/', (req, res) => {
  const question: string = req.body.question;
  const options: string[] = req.body.options || [];
  const newPoll = { question: question };
  const createPoll = addPoll(newPoll);
  const createPollOptions = createPoll.then(addedPoll => {
    return PollOption.create(options.map(option => ({ pollId: addedPoll._id, optionText: option })));
  });
  Promise.all([createPoll, createPollOptions]).then(([addedPoll, addedPollOptions]) => {
    res.send(addedPoll);
  }).catch(err => {
    res.sendStatus(500);
  });
});

export const PollsRouter: Router = router;
