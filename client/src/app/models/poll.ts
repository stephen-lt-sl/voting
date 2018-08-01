import { PollOption } from './poll-option';

export class Poll {
  _id: string;
  question: string;
  options?: PollOption[];
}
