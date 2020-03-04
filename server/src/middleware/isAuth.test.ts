import isAuth from './isAuth';
import { User } from '../models/User';
import { connectMongoose } from '../utils/database';
import { signToken } from '../utils/auth';
import { username } from '../testing/database/createUser';
import { getFunctionThrowedError } from '../testing/other/getFunctionThrowedError';
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
});

afterAll(async () => {
  await connection.disconnect();
});

describe('isAuth', () => {
  test('throw error when auth header not provided', async () => {
    const resolverData = createResolverData({});
    const err = await getFunctionThrowedError(() =>
      isAuth(resolverData, jest.fn())
    );

    expect(err).toBeTruthy();
  });

  test('throw error when token is not valid', async () => {
    const headers = { authorization: 'Bearer not_valid_token' };
    const resolverData = createResolverData(headers);
    const err = await getFunctionThrowedError(() =>
      isAuth(resolverData, jest.fn())
    );

    expect(err).toBeTruthy();
  });

  test('add userId to context payload and call next', async () => {
    const mockNext = jest.fn();
    const user = await User.findOne({ username });
    const token = signToken(user!.id);

    const headers = { authorization: `Bearer ${token}` };
    const resolverData = createResolverData(headers);

    await isAuth(resolverData, mockNext);

    expect(resolverData.context.payload.userId).toBe(user!.id);
    expect(mockNext.mock.calls.length).toBe(1);
  });
});
