import { Router } from 'express';
import { getAllPolls, IPollModel, Poll } from '../schemas/poll';
import { PollOption } from '../schemas/poll-option';
import { ObjectId } from 'bson';

const router = Router();

const mockPolls: IPollModel[] = [
  new Poll({ question: 'How many shrimps do you have to eat?', options: [
    new PollOption({ optionText: '4' }),
    new PollOption({ optionText: '12' }),
    new PollOption({ optionText: 'Irrelevant.' })
  ]}),
  new Poll({ question: 'What should we have for lunch?', options: [
    new PollOption({ optionText: '3bros', voterIds: [] }),
    new PollOption({ optionText: 'mezze' }),
    new PollOption({ optionText: 'Irrelevant.' })
  ]}),
  new Poll({ question: 'Who is the coolest in the office?', options: [
    new PollOption({ optionText: 'Steve LT' }),
    new PollOption({ optionText: 'Stephen Tozer' }),
    new PollOption({ optionText: 'Stevey-T' })
  ]}),
];

getAllPolls().then(polls => {
  if (polls.length === 0) {
    console.log('No polls present; adding mocks...');
    const createMockPolls = mockPolls.map(mockPoll => mockPoll.save());
    Promise.all(createMockPolls).then(insertedPolls => {
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
    console.error(`Failed to get polls": ${err}`);
    res.json({success: false, message: `Failed to fetch polls. Error: ${err}`});
  });
});

router.get('/:pollId', (req, res) => {
  const pollId: ObjectId = req.params.pollId;

  Poll.findById(pollId).exec().then(foundPoll => {
    if (foundPoll) {
      console.log(`result: ${JSON.stringify(foundPoll)}`);
      res.send(foundPoll);
    } else {
      res.sendStatus(404);
    }
  }).catch(err => {
    console.error(`Failed to get poll "${pollId}": ${err}`);
    res.json({success: false, message: `Failed to fetch polls. Error: ${err}`});
  });
});

router.post('/', (req, res) => {
  const question: string = req.body.question;
  const options: string[] = req.body.options || [];

  const newPollOptions = options.map(option => new PollOption({ optionText: option }));
  const newPoll = new Poll({ question: question, options: newPollOptions });

  newPoll.save().then(createdPoll => {
    res.send(createdPoll);
  }).catch(err => {
    console.error(`Failed to save poll: ${err}`);
    res.sendStatus(500);
  });
});

export const PollsRouter: Router = router;
