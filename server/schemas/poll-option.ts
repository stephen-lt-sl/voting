import { Document, Schema, Model, model } from 'mongoose';
import { IPollOption } from '../interfaces/poll-option';
import { ObjectId } from 'bson';

export interface IPollOptionModel extends IPollOption, Document {

}

export const PollOptionSchema: Schema = new Schema({
  pollId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  optionText: {
    type: Schema.Types.String,
    required: true,
  }
});

export const PollOption: Model<IPollOptionModel> = model<IPollOptionModel>('PollOption', PollOptionSchema);

export function getOptionsForPoll(pollId: ObjectId): Promise<IPollOptionModel[]> {
  return PollOption.find( { pollId: pollId } ).exec();
}
