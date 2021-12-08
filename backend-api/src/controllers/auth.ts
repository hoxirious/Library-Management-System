import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

dotenv.config();
const secret = process.env.JWT_SECRET;

export const login = (req: Request, res: Response) => {
  const {library, username, password} = req.body;

  if (library && username) {
    const queryString = `SELECT * FROM LOGIN WHERE USERNAME=? AND LIBRARY_NAME=?`;

    db.execute(queryString, [username, library], (err, result) => {
      const resultArr = <RowDataPacket> result;

      if (!err && resultArr.length > 0) {
        
        const user = resultArr[0];

        if (user.PASSWORD == password) {
          const tokenBody = {
            username: user.USERNAME,
            role: user.USERTYPE,
            library: user.LIBRARY_NAME
          }
          const accessToken = jwt.sign(tokenBody, secret);
      
          res.json({
            accessToken
          });
        }
        else {
          res.status(403).send('Incorrect password.');
        }
      }
      else {
        res.status(403).send('Username not found.');
      }
    });
  }
  else {
    res.status(400).send("Invalid data for request.");
  }
}

export const changePassword = (req: Request, res:Response) => {
  const {library, username, old_password, new_password} = req.body;

  if (library && username && new_password) {
    const jwt_username = res.locals.user.username;
    const jwt_library = res.locals.user.library;
  
    if (jwt_username != username || jwt_library != library) return res.sendStatus(403);
  
    let queryString = `SELECT * FROM LOGIN WHERE USERNAME=? AND LIBRARY_NAME=?`;
  
    db.execute(queryString, [username, library], (err, result) => {
      const resultArr = <RowDataPacket> result;
  
      if (!err && resultArr.length > 0) {
  
        const user = (<RowDataPacket> result)[0];
  
        if (user.PASSWORD == old_password) {
          queryString = `UPDATE LOGIN SET PASSWORD=? WHERE USERNAME=? AND LIBRARY_NAME=?`;
  
          db.execute(queryString, [new_password, username, library]);
          res.send('Password changed successfully.')
        }
        else {
          res.status(403).send('Passwords do not match.');
        }
      }
      else {
        res.status(403).send('Username not found.');
      }
    });
  }
  else {
    res.status(400).send("Invalid data for request.");
  }
}
