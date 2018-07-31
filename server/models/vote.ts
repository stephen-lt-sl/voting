import { User } from './user';
import { PollOption } from './poll-option';

export class Vote {
  id: number;
  userId: number;
  pollOptionId: number;
  user?: User;
  pollOption?: PollOption;
}
