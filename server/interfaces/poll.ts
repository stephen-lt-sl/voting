import { IPollOption } from './poll-option';

export interface IPoll {
  question: string;
  options: IPollOption[];
}
