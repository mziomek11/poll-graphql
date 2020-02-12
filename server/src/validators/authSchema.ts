import * as yup from 'yup';

export const emailNotLongEnough = 'Email must be at least 3 characters';
export const usernameNotLongEnough = 'Username must be at least 3 characters';
export const passwordNotLongEnough = 'Password must be at least 3 characters';
export const invalidEmail = 'Invalid email was provided';

export const emailValidation = yup
  .string()
  .min(3, emailNotLongEnough)
  .max(255)
  .email(invalidEmail)
  .required();

export const usernameValidation = yup
  .string()
  .min(3, usernameNotLongEnough)
  .max(255)
  .required();

export const passwordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const registerSchema = yup.object().shape({
  email: emailValidation,
  username: usernameValidation,
  password: passwordValidation
});
