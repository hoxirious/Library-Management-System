import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const authenticateJWT = (req: Request, res: Response, next: Function) => {
  
  if (req.path == '/login') return next();

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      res.locals.user = user;
      next();
    });
  }
  else {
    res.sendStatus(401);
  }
}