import { MiddlewareFn, UnauthorizedError } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { IContext } from '../types/Context';
import { ITokenPayload } from '../types/TokenPayload';

const isAuth: MiddlewareFn<IContext> = async ({ context }, next) => {
  const authorization = context.req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError();
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(
      token,
      process.env.AUTH_SECRET_KEY!
    ) as ITokenPayload;
    context.payload = { userId: payload.userId };
  } catch (err) {
    throw new UnauthorizedError();
  }

  return next();
};

export default isAuth;
