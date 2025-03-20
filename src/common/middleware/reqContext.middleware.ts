import { Request, Response, NextFunction } from 'express';

export function ReqContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next();
}
