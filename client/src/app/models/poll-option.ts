import { Vote } from './vote';

export class PollOption {
  id?: number;
  pollId?: number;
  optionText: string;
  votes?: Vote[];
}
