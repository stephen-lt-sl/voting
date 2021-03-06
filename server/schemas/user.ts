import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user';

export interface IUserModel extends IUser, Document {

}

export const UserSchema: Schema = new Schema({
  googleId: String,
  name: String,
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
