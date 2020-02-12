import { Connection } from 'typeorm';

import request from '../testUtils/request';
import { register } from '../testUtils/mutations';

import User from '../entity/User';
import connectToORM from '../utils/connectToORM';
import { accountCreatedMessage } from '../resolvers/AuthResolver';

const firstUsername = 'first_username';
const firstEmail = 'first_email@something.com';
const firstPassword = 'first_password';

let conn: Connection;

beforeAll(async () => {
  conn = await connectToORM();
});

afterAll(async () => {
  await conn.close();
});

describe('register', () => {
  test('add user to database', async () => {
    const mutation = register(firstUsername, firstEmail, firstPassword);
    const res = await request(mutation);

    expect(res.register).toBe(accountCreatedMessage);

    const createdUser = await User.findOne({
      where: { username: firstUsername, email: firstEmail },
      select: ['id']
    });
    expect(createdUser).toBeTruthy();
  });

  test('created user have hashed password', async () => {
    const createdUser = await User.findOne({
      where: { username: firstUsername, email: firstEmail },
      select: ['id']
    });

    expect(createdUser?.password).not.toBe(firstPassword);
  });

  test('create second user', async () => {
    const username = 'second_user';
    const email = 'second_user@something.com';

    const mutation = register(username, email, firstPassword);
    await request(mutation);

    const createdUser = await User.findOne({
      where: { username, email },
      select: ['id']
    });

    expect(createdUser).toBeTruthy();
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
