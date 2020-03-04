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
    test('add user to database with hashed password', async () => {
      const firstUsername = 'first_username';
      const firstEmail = 'first_email@something.com';
      const firstPassword = 'first_password';
      const mutation = register(firstUsername, firstEmail, firstPassword);
      await request(mutation);

      const createdUser = await User.findOne({
        username: firstUsername,
        email: firstEmail
      });

      expect(createdUser).toBeTruthy();
      expect(createdUser?.password).not.toBe(firstPassword);
    });

    test('create second user', async () => {
      const testUsername = 'second_user';
      const testEmail = 'second_user@something.com';

      const mutation = register(testUsername, testEmail, 'password');
      await request(mutation);

      const createdUser = await User.findOne({
        username: testUsername,
        email: testEmail
      });

      expect(createdUser).toBeTruthy();
    });

    test('throw error when validation fails', async () => {
      const mutation = register('abcdcae', 'wrong_mail', 'asasdasd');
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeTruthy();
    });

    test('throw error when username already exists', async () => {
      const testEmail = 'anotheremail@smthing.com';
      const mutation = register(username, testEmail, 'password');
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeTruthy();
    });

    test('throw error when email already exists', async () => {
      const testUsername = 'anotherusername';
      const mutation = register(testUsername, email, 'password');
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeTruthy();
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

      expect(err).toBeTruthy();
    });

    test('throw error when password is wrong', async () => {
      const mutation = login(username, 'wrong_password');
      const err = await getFunctionThrowedError(() => request(mutation));

      expect(err).toBeTruthy();
    });
  });
});
