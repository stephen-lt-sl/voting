import { ObjectId } from 'bson';

export interface IPollOption {
  pollId: ObjectId;
  optionText: string;
}
