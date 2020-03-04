import { Schema, model, Document } from 'mongoose';

import { IUserModel } from './User';

export interface IPollModel extends Document {
  user: IUserModel | string;
  creationTime: Date;
  question: string;
  options: { text: string; votes: number }[];
}

const PollSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  creationTime: { type: Date, default: Date.now },
  question: String,
  options: [{ text: String, votes: Number }]
});

export const Poll = model<IPollModel>('Poll', PollSchema);
