import { Schema, model, Document } from 'mongoose';

export interface IPollOption {
  text: string;
  votes: number;
}

export interface IPollModel extends Document {
  userId: string;
  creationTime: Date;
  question: string;
  options: IPollOption[];
}

const PollSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  creationTime: { type: Date, default: Date.now },
  question: String,
  options: [{ text: String, votes: Number }]
});

export const Poll = model<IPollModel>('Poll', PollSchema);
