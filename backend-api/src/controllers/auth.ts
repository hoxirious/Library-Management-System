import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

dotenv.config();
const secret = process.env.JWT_SECRET;

export const login = (req: Request, res: Response) => {
  const {library, username, password} = req.body;

  const queryString = `SELECT * FROM LOGIN WHERE username=? AND library_name=?`;

  db.execute(queryString, [username, library], (err, result) => {
    if (!err) {
      
      const user = (<RowDataPacket> result)[0];

      if (user.PASSWORD == password) {
        const tokenBody = {
          username: user.USERNAME,
          role: user.USERTYPE,
        }
        const accessToken = jwt.sign(tokenBody, secret);
    
        res.json({
          accessToken
        });
      }
      else {
        res.send('Incorrect password.');
      }
    }
    else {
      res.send('Incorrect username.');
    }
  });
};
