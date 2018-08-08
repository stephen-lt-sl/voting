import { Router } from 'express';
import { UserService } from '../services/user-service';
import { VoteService } from '../services/vote-service';

const router = Router();

const userService = new UserService();
const votesService = new VoteService();

router.post('/', (req, res) => {
  const authUser = res.locals.AuthenticatedUser;
  if (authUser === undefined || authUser === null) {
    console.error(`No authenticated user token included with vote!`);
    res.sendStatus(403);
    return;
  }
  userService.findOrCreateUser(authUser['hd'], authUser['sub'], 'Anonymous')
    .then(user => {
      const pollId = req.body.pollId;
      const pollOptionId = req.body.pollOptionId;
      return votesService.clearVote(pollId, user.googleId)
        .then(() => votesService.addVote(pollId, pollOptionId, user.googleId));
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(`Error adding user vote: ${err}`);
      res.sendStatus(500);
    });
});

export const VotesRouter = router;
