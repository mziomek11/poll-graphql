import { Schema, model, Document } from 'mongoose';

export interface IUserDataModel {
  email: string;
  username: string;
  password: string;
}

export interface IUserModel extends Document, IUserDataModel {}

const UserSchema = new Schema({
  email: String,
  username: String,
  password: String
});

export const User = model<IUserModel>('User', UserSchema);
