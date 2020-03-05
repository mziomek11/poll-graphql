import request from '../testing/api/request';
import { register, login } from '../testing/api/mutations';
import { getFunctionThrowedError } from '../testing/other/getFunctionThrowedError';
import { connectMongoose } from '../utils/database';
import { User } from '../models/User';
import { Connection } from '../types/Connection';
import { username, password, email } from '../testing/database/createUser';

let connection: Connection;

beforeAll(async () => {
  connection = await connectMongoose();
});

afterAll(async () => {
  await connection.disconnect();
});

describe('AuthResolver', () => {
  describe('register', () => {
    const firstEmail = 'first_eMAil@somEThiNg.cOm';

    test('add user to database with hashed password and lowercased email', async () => {
      const firstUsername = 'first_username';
      const firstPassword = 'first_password';
      const mutation = register(firstUsername, firstEmail, firstPassword);
      await request(mutation);

      const createdUser = await User.findOne({
        username: firstUsername
      });

      expect(createdUser).toBeTruthy();
      expect(createdUser?.email).toBe(firstEmail.toLowerCase());
      expect(createdUser?.password).not.toBe(firstPassword);
    });

    test('create second user', async () => {
      const testUsername = 'second_user';
      const testEmail = 'second_user@something.com';

      const mutation = register(testUsername, testEmail, 'password');
      await request(mutation);

      const createdUser = await User.findOne({
        username: testUsername
      });

      expect(createdUser).toBeTruthy();
    });

    test('throw error when validation fails', async () => {
      const mutation = register('abcdcae', 'wrong_mail', 'asasdasd');
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeDefined();
    });

    test('throw error when username already exists', async () => {
      const testEmail = 'anotheremail@smthing.com';
      const mutation = register(username, testEmail, 'password');
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeDefined();
    });

    describe('throw error when email already exists', () => {
      test('exact email', async () => {
        const testUsername = 'anotherusername';
        const mutation = register(testUsername, email, 'password');
        const err = await getFunctionThrowedError(() => request(mutation));

        expect(err).toBeDefined();
      });

      test('email with different letter casing', async () => {
        const testUsername = 'anotherusername';
        const testEmail = email.toUpperCase();
        const mutation = register(testUsername, testEmail, 'password');
        const err = await getFunctionThrowedError(() => request(mutation));

        expect(err).toBeDefined();
      });
    });
  });

  describe('login', () => {
    test('not throw error when provided valid credentials', async () => {
      const mutation = login(username, password);
      const res = await request(mutation);

      expect(res.login.token).toBeTruthy();
    });

    test('throw error when username does not exists', async () => {
      const mutation = login('username_that_does_not_exists', password);
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeDefined();
    });

    test('throw error when password is wrong', async () => {
      const mutation = login(username, 'wrong_password');
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeDefined();
    });
  });
});
