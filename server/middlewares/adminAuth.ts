import { NextFunction, Request, Response } from 'express';

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.isAdmin) {
    return res.status(401).json('You need to be admin to do this');
  }
  next();
}
