import { Request, Response } from 'express';

import { ITokenPayload } from './TokenPayload';
import { UserLoader } from '../loaders/user';

export interface IContext {
  req: Request;
  res: Response;
  userLoader: UserLoader;
  payload?: ITokenPayload;
}
