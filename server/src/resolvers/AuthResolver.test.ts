import { Connection } from 'typeorm';

import request from '../test-utils/request';
import { register, login } from '../test-utils/mutations';

import User from '../entity/User';
import { connect } from '../utils/typeORM';

const firstUsername = 'first_username';
const firstEmail = 'first_email@something.com';
const firstPassword = 'first_password';

let conn: Connection;

beforeAll(async done => {
  conn = await connect();
  done();
});

afterAll(async done => {
  await conn.close();
  done();
});

describe('register', () => {
  test('add user to database', async done => {
    const mutation = register(firstUsername, firstEmail, firstPassword);
    await request(mutation);

    const createdUser = await User.findOne({
      where: { username: firstUsername, email: firstEmail },
      select: ['id']
    });
    expect(createdUser).toBeTruthy();
    done();
  });

  test('created user have hashed password', async done => {
    const createdUser = await User.findOne({
      where: { username: firstUsername, email: firstEmail },
      select: ['id']
    });

    expect(createdUser?.password).not.toBe(firstPassword);
    done();
  });

  test('create second user', async done => {
    const username = 'second_user';
    const email = 'second_user@something.com';

    const mutation = register(username, email, firstPassword);
    await request(mutation);

    const createdUser = await User.findOne({
      where: { username, email },
      select: ['id']
    });

    expect(createdUser).toBeTruthy();
    done();
  });

  test('throw error when yup validation fails', async done => {
    const username = 'yup_test_username';
    const email = 'yup_test_email';
    const mutation = register(username, email, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
    done();
  });

  test('throw error when username already exists', async done => {
    const email = 'anotheremail@smthing.com';
    const mutation = register(firstUsername, email, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
    done();
  });

  test('throw error when email already exists', async done => {
    const username = 'anotherusername';
    const mutation = register(username, firstUsername, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
    done();
  });
});

describe('login', () => {
  test('not throw error when provided valid credentials', async done => {
    const mutation = login(firstUsername, firstPassword);
    const res = await request(mutation);

    expect(res.login.token).toBeTruthy();
    done();
  });

  test('throw error when username does not exists', async done => {
    const username = 'username_that_does_not_exists';
    const mutation = login(username, firstPassword);

    expect(request(mutation)).rejects.toThrow(Error);
    done();
  });

  test('throw error when password is wrong', async done => {
    const password = 'wrong_password';
    const mutation = login(firstUsername, password);

    expect(request(mutation)).rejects.toThrow(Error);
    done();
  });
});
