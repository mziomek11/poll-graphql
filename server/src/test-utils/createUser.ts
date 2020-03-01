import User from '../entity/User';

export const username = 'first_username';
export const email = 'first_email@something.com';
export const password = 'first_password';

export async function createUser() {
  const user = await User.create({ username, email, password }).save();

  return user;
}
