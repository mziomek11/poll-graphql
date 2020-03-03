import request from '../testing/api/request';
import { register, login } from '../testing/api/mutations';
import { connectMongoose } from '../utils/database';
import { User } from '../models/User';
import { Connection } from '../types/Connection';
import { clearDatabase } from '../testing/database/clearDatabase';
import { username, password, createUser } from '../testing/database/createUser';

let connection: Connection;

beforeAll(async () => {
  connection = await connectMongoose();
});

afterAll(async () => {
  await connection.disconnect();
});

describe('AuthResolver', () => {
  describe('register', () => {
    const firstUsername = 'first_username';
    const firstEmail = 'first_email@something.com';
    const firstPassword = 'first_password';

    beforeAll(async () => {
      await clearDatabase();
    });

    test('add user to database', async () => {
      const mutation = register(firstUsername, firstEmail, firstPassword);
      await request(mutation);

      const createdUser = await User.findOne({
        username: firstUsername,
        email: firstEmail
      });
      expect(createdUser).toBeTruthy();
    });

    test('created user have hashed password', async () => {
      const createdUser = await User.findOne({
        username: firstUsername,
        email: firstEmail
      });

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
      const testUsername = 'test_username';
      const testEmail = 'test_email';
      const mutation = register(testUsername, testEmail, firstPassword);

      await expect(request(mutation)).rejects.toThrow(Error);
    });

    test('throw error when username already exists', async () => {
      const testEmail = 'anotheremail@smthing.com';
      const mutation = register(firstUsername, testEmail, firstPassword);

      await expect(request(mutation)).rejects.toThrow(Error);
    });

    test('throw error when email already exists', async () => {
      const testUsername = 'anotherusername';
      const mutation = register(testUsername, firstEmail, firstPassword);

      await expect(request(mutation)).rejects.toThrow(Error);
    });
  });

  describe('login', () => {
    beforeAll(async () => {
      await clearDatabase();
      await createUser(true);
    });

    test('not throw error when provided valid credentials', async () => {
      const mutation = login(username, password);
      const res = await request(mutation);

      expect(res.login.token).toBeTruthy();
    });

    test('throw error when username does not exists', async () => {
      const mutation = login('username_that_does_not_exists', password);

      await expect(request(mutation)).rejects.toThrow(Error);
    });

    test('throw error when password is wrong', async () => {
      const mutation = login(username, 'wrong_password');

      await expect(request(mutation)).rejects.toThrow(Error);
    });
  });
});
