import { ObjectId } from 'bson';
import { Poll } from '../schemas/poll';


export class VoteService {

  addVote(pollId: ObjectId, pollOptionId: ObjectId, userId: string) {
    return Poll.update(
      { _id: pollId, 'options._id': pollOptionId },
      { $push: { 'options.$.voterIds': userId } }
    ).exec();
  }

  clearVote(pollId: ObjectId, userId: string) {
    return Poll.update(
      { _id: pollId, 'options.voterIds': { $exists: true } },
      { $pull: { 'options.$[].voterIds': userId } }
    ).exec();
  }

}
