import { Request, Response } from 'express';

type Context = {
  req: Request;
  res: Response;
  payload?: { userId: string };
};

export default Context;
