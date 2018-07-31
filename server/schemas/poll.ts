import { Document, Schema, Model, model } from 'mongoose';
import { IPoll } from '../interfaces/poll';

export interface IPollModel extends IPoll, Document {

}

export const PollSchema: Schema = new Schema({
  question: {
    type: String,
    required: true,
  }
});

export const Poll: Model<IPollModel> = model<IPollModel>('Poll', PollSchema);

export function getAllPolls(): Promise<IPollModel[]> {
  return Poll.find().exec();
}

export function addPoll(poll: IPoll): Promise<IPollModel> {
  return Poll.create(poll);
}
