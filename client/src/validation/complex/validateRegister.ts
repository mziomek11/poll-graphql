import isEmpty from '../simple/isEmpty';
import isEmail from '../simple/isEmail';

export const usernameRequired = 'Username is required';
export const emailRequired = 'Email is required';
export const emailNotValid = 'Email is not valid';
export const passwordRequired = 'Password is required';
export const confirmPasswordRequired = 'Confirm password is required';
export const passwordNotMatch = 'Passwords do not match';

export type RegisterData = {
  confirmPassword: string;
  password: string;
  email: string;
  username: string;
};

export default function({
  confirmPassword,
  password,
  email,
  username
}: RegisterData) {
  const errors: Partial<RegisterData> = {};

  if (isEmpty(username)) errors.username = usernameRequired;

  if (isEmpty(email)) errors.email = emailRequired;
  else if (!isEmail(email)) errors.email = emailNotValid;

  if (isEmpty(password)) errors.password = passwordRequired;

  if (isEmpty(confirmPassword))
    errors.confirmPassword = confirmPasswordRequired;
  else if (password !== confirmPassword) {
    errors.confirmPassword = passwordNotMatch;
  }

  return errors;
}
