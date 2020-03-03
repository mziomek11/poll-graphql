import { Request, Response } from 'express';
import { ITokenPayload } from './TokenPayload';

export interface IContext {
  req: Request;
  res: Response;
  payload?: ITokenPayload;
}
