import isAuth from './isAuth';
import { connectMongoose } from '../utils/database';
import { signToken } from '../utils/auth';
import { createUser } from '../testing/database/createUser';
import { clearDatabase } from '../testing/database/clearDatabase';
import { Connection } from '../types/Connection';

const createResolverData = (headers: any): any => ({
  context: {
    req: {
      headers
    }
  }
});

let connection: Connection;

beforeAll(async () => {
  connection = await connectMongoose();
  await clearDatabase();
});

afterAll(async () => {
  await connection.disconnect();
});

describe('isAuth', () => {
  test('throw error when auth header not provided', async () => {
    const resolverData = createResolverData({});

    await expect(isAuth(resolverData, jest.fn())).rejects.toThrow(Error);
  });

  test('throw error when token is not valid', async () => {
    const headers = { authorization: 'Bearer not_valid_token' };
    const resolverData = createResolverData(headers);

    await expect(isAuth(resolverData, jest.fn())).rejects.toThrow(Error);
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
