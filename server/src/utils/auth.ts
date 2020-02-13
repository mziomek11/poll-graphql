import { sign } from 'jsonwebtoken';

export const signToken = (userId: string) => {
  const milisecondsInDay = 1000 * 60 * 60 * 24;
  const token = sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: milisecondsInDay
  });

  return token;
};
