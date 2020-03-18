import validateRegister, {
  confirmPasswordRequired,
  emailRequired,
  emailNotValid,
  passwordNotMatch,
  passwordRequired,
  usernameRequired
} from './validateRegister';

const validData = {
  username: 'a',
  password: 'a',
  email: 'valid@email.com',
  confirmPassword: 'a'
};

describe('Validator validateRegister', () => {
  test('return empty array when data is valid', () => {
    const result = validateRegister(validData);

    expect(Object.keys(result).length).toBe(0);
  });

  test('return object with all errors when nothing is valid', () => {
    const result = validateRegister({
      username: '',
      password: '',
      email: '',
      confirmPassword: ''
    });

    expect(Object.keys(result).length).toBe(4);
    expect(result.username).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.confirmPassword).toBeDefined();
  });

  describe('fields', () => {
    describe('username', () => {
      test('required', () => {
        const result = validateRegister({ ...validData, username: '' });

        expect(Object.keys(result).length).toBe(1);
        expect(result.username).toBe(usernameRequired);
      });
    });

    describe('email', () => {
      test('required', () => {
        const result = validateRegister({ ...validData, email: '' });

        expect(Object.keys(result).length).toBe(1);
        expect(result.email).toBe(emailRequired);
      });

      test('is email', () => {
        const result = validateRegister({ ...validData, email: 'a@a' });

        expect(Object.keys(result).length).toBe(1);
        expect(result.email).toBe(emailNotValid);
      });
    });

    describe('password', () => {
      test('required', () => {
        const result = validateRegister({ ...validData, password: '' });

        expect(result.password).toBe(passwordRequired);
      });
    });

    describe('confirmPassword', () => {
      test('required', () => {
        const result = validateRegister({ ...validData, confirmPassword: '' });

        expect(Object.keys(result).length).toBe(1);
        expect(result.confirmPassword).toBe(confirmPasswordRequired);
      });

      test('match password', () => {
        const result = validateRegister({
          ...validData,
          confirmPassword: 'a',
          password: 'b'
        });

        expect(Object.keys(result).length).toBe(1);
        expect(result.confirmPassword).toBe(passwordNotMatch);
      });
    });
  });
});
