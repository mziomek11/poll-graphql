import { Schema, Types, model, Document } from 'mongoose';

export interface IPollDataModel {
  userId: Types.ObjectId;
  creationTime: Date;
  question: string;
  options: IPollOption[];
  votedBy: Types.ObjectId[];
}

export interface IPollOption {
  text: string;
  votes: number;
}

export interface IPollModel extends IPollDataModel, Document {}

const PollSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  creationTime: { type: Date, default: Date.now },
  question: String,
  options: [{ text: String, votes: Number }],
  votedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export const Poll = model<IPollModel>('Poll', PollSchema);
