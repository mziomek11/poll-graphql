import { isEmpty } from '../utils/validation';
import { usernameRequired, passwordRequired } from './messages';

export type LoginData = {
  password: string;
  username: string;
};

export default function({ password, username }: LoginData) {
  const errors: Partial<LoginData> = {};

  if (isEmpty(username)) errors.username = usernameRequired;

  if (isEmpty(password)) errors.password = passwordRequired;

  return errors;
}
