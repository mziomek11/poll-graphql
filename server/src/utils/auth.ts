import { sign } from 'jsonwebtoken';

import { ITokenPayload } from '../types/TokenPayload';

export const signToken = (userId: string) => {
  const milisecondsInDay = 1000 * 60 * 60 * 24;
  const payload: ITokenPayload = { userId };
  const token = sign(payload, process.env.AUTH_SECRET_KEY!, {
    expiresIn: milisecondsInDay
  });

  return token;
};
