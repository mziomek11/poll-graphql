import { Schema, model, Document } from 'mongoose';

interface IUserModel extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = model<IUserModel>('user', UserSchema);
