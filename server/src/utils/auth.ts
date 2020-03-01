import { sign } from 'jsonwebtoken';

import TokenPayload from '../types/TokenPayload';

export const signToken = (userId: string) => {
  const milisecondsInDay = 1000 * 60 * 60 * 24;
  const payload: TokenPayload = { userId };
  const token = sign(payload, process.env.SECRET_KEY!, {
    expiresIn: milisecondsInDay
  });

  return token;
};
