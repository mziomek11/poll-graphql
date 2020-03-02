import request from '../test-utils/request';
import { register, login } from '../test-utils/mutations';

import { connectMongoose } from '../utils/db';
import { User } from '../models/User';
import { IConnection } from '../types/Connection';
import { clearDatabase } from '../test-utils/clearDatabase';

const firstUsername = 'first_username';
const firstEmail = 'first_email@something.com';
const firstPassword = 'first_password';

let connection: IConnection;

beforeAll(async () => {
  connection = await connectMongoose();
  await clearDatabase();
});

afterAll(async () => {
  await connection.disconnect();
});

describe('register', () => {
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
    const username = 'second_user';
    const email = 'second_user@something.com';

    const mutation = register(username, email, firstPassword);
    await request(mutation);

    const createdUser = await User.findOne({ username, email });

    expect(createdUser).toBeTruthy();
  });

  test('throw error when yup validation fails', async () => {
    const username = 'yup_test_username';
    const email = 'yup_test_email';
    const mutation = register(username, email, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
  });

  test('throw error when username already exists', async () => {
    const email = 'anotheremail@smthing.com';
    const mutation = register(firstUsername, email, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
  });

  test('throw error when email already exists', async () => {
    const username = 'anotherusername';
    const mutation = register(username, firstUsername, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
  });
});

describe('login', () => {
  test('not throw error when provided valid credentials', async () => {
    const mutation = login(firstUsername, firstPassword);
    const res = await request(mutation);

    expect(res.login.token).toBeTruthy();
  });

  test('throw error when username does not exists', async () => {
    const username = 'username_that_does_not_exists';
    const mutation = login(username, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
  });

  test('throw error when password is wrong', async () => {
    const password = 'wrong_password';
    const mutation = login(firstUsername, password);

    expect(request(mutation)).rejects.toThrow(Error);
  });
});
