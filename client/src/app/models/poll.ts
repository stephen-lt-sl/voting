import { PollOption } from './poll-option';

export class Poll {
  id?: number;
  question: string;
  pollOptions: PollOption[];
}
