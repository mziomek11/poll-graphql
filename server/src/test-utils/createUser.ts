import { User } from '../models/User';

export const username = 'created_user_username';
export const password = 'created_user_password';
export const email = 'created_user_email';

export const createUser = async () => {
  const user = await User.create({ email, username, password });

  return user;
};
