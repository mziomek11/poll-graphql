import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { IContext } from '../types/Context';
import { ITokenPayload } from '../types/TokenPayload';
import AuthError from '../errors/auth';

const isAuth: MiddlewareFn<IContext> = async ({ context }, next) => {
  const authorization = context.req.headers.authorization;

  if (!authorization) throw new Error(AuthError.ACCESS_DENIED);
  try {
    const token = authorization.split(' ')[1];
    const payload = verify(
      token,
      process.env.AUTH_SECRET_KEY!
    ) as ITokenPayload;
    context.payload = { userId: payload.userId };
  } catch (err) {
    throw new Error(AuthError.ACCESS_DENIED);
  }

  next();
};

export default isAuth;
