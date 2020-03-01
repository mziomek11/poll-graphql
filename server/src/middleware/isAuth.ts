import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import Context from '../types/Context';
import TokenPayload from '../types/TokenPayload';
import AuthError from '../errors/auth';

const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  const authorization = context.req.headers.authorization;

  if (!authorization) throw new Error(AuthError.ACCESS_DENIED);
  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.SECRET_KEY!) as TokenPayload;
    context.payload = { userId: payload.userId };
  } catch (err) {
    throw new Error(AuthError.ACCESS_DENIED);
  }

  next();
};

export default isAuth;
