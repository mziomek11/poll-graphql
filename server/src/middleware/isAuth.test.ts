import { Connection } from 'typeorm';

import { connect } from '../utils/typeORM';
import { signToken } from '../utils/auth';
import { createUser } from '../test-utils/createUser';
import isAuth from './isAuth';

const createResolverData = (headers: any): any => ({
  context: {
    req: {
      headers
    }
  }
});

let conn: Connection;

beforeAll(async () => {
  conn = await connect();
});

afterAll(async () => {
  await conn.close();
});

describe('isAuth', () => {
  test('throw error when auth header not provided', () => {
    const resolverData = createResolverData({});

    expect(isAuth(resolverData, jest.fn())).rejects.toThrow(Error);
  });

  test('throw error when token is not valid', () => {
    const headers = { authorization: 'Bearer not_valid_token' };
    const resolverData = createResolverData(headers);

    expect(isAuth(resolverData, jest.fn())).rejects.toThrow(Error);
  });

  test('add userId to context payload and call next', async () => {
    const mockNext = jest.fn();
    const user = await createUser();
    const token = signToken(user.id);

    const headers = { authorization: `Bearer ${token}` };
    const resolverData = createResolverData(headers);

    isAuth(resolverData, mockNext);

    expect(resolverData.context.payload.userId).toBe(user.id);
    expect(mockNext.mock.calls.length).toBe(1);
  });
});
