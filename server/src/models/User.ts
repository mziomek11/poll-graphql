import { Schema, model, Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String }
});

export const User = model<IUserModel>('user', UserSchema);
