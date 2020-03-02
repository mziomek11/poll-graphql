import isAuth from './isAuth';
import { connectMongoose } from '../utils/db';
import { signToken } from '../utils/auth';
import { createUser } from '../test-utils/createUser';
import { clearDatabase } from '../test-utils/clearDatabase';
import { IConnection } from '../types/Connection';

const createResolverData = (headers: any): any => ({
  context: {
    req: {
      headers
    }
  }
});

let connection: IConnection;

beforeAll(async () => {
  connection = await connectMongoose();
  await clearDatabase();
});

afterAll(async () => {
  await connection.disconnect();
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
