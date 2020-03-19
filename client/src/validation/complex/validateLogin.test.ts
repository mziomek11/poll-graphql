import validateLogin from './validateLogin';
import { passwordRequired, usernameRequired } from '../messages';

const validData = {
  username: 'a',
  password: 'a'
};

describe('Validator validateLogin', () => {
  test('return empty array when data is valid', () => {
    const result = validateLogin(validData);

    expect(Object.keys(result).length).toBe(0);
  });

  test('return object with all errors when nothing is valid', () => {
    const result = validateLogin({
      username: '',
      password: ''
    });

    expect(Object.keys(result).length).toBe(2);
    expect(result.username).toBeDefined();
    expect(result.password).toBeDefined();
  });

  describe('fields', () => {
    describe('username', () => {
      test('required', () => {
        const result = validateLogin({ ...validData, username: '' });

        expect(Object.keys(result).length).toBe(1);
        expect(result.username).toBe(usernameRequired);
      });
    });

    describe('password', () => {
      test('required', () => {
        const result = validateLogin({ ...validData, password: '' });

        expect(result.password).toBe(passwordRequired);
      });
    });
  });
});
