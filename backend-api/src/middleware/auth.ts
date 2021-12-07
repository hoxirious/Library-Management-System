import jwt from 'jsonwebtoken';
import e, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { db } from '../services/db';
import { RowDataPacket } from 'mysql2';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const authenticateJWT = (req: Request, res: Response, next: Function) => {
  
  if (req.path == '/login' && req.method == 'POST') return next();

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

export const minimumRoleRequired = (requiredRole: String) => {
  return (req: Request, res: Response, next: Function) => {
    const {role} = res.locals.user;
    if (role == 'SYSADMIN') return next();
    else if (requiredRole == 'LIBRARIAN' && role == 'LIBRARIAN') return next();
    else {
      const errString = `You do not have the necessary permissions to perform this action.
      You are authenticated as ${role} and this action requires at least ${requiredRole}.`;
      res.status(403).send(errString);
    }
  }
}

export const onlyForSelf = (studentReq: boolean, idIsParam: boolean) => {
  return (req: Request, res: Response, next: Function) => {
    const id_string = studentReq ? 'student_id' : 'librarian_id';
    const id = idIsParam ? req.params[id_string] : req.body[id_string];
    const {role} = res.locals.user;
    const errString = `You do not have the necessary permissions to perform this action.
    You are authenticated as ${role} and this action requires at least ${studentReq ? 'LIBRARIAN' : 'SYSADMIN'}.`;

    if (role == 'SYSADMIN') return next();
    else if (studentReq) {
      if (role == 'LIBRARIAN') return next();
      else {
        checkIfSelf(id, 'STUDENT', res.locals.user, (ans: String) => {
          if (ans == 'same') return next();
          else if (ans == 'diff') res.status(403).send(errString);
          else if (ans == 'dne') res.status(404).send('Student not found.');
          else res.status(400).send('Invalid data for request.');
        });
      }
    }
    else {
      checkIfSelf(id, 'LIBRARIAN', res.locals.user, (ans: String) => {
        if (ans == 'same') return next();
        else if (ans == 'diff') res.status(403).send(errString);
        else if (ans == 'dne') res.status(404).send('Student not found.');
        else res.status(400).send('Invalid data for request.');
      });
    }
  }
}

const checkIfSelf = (id: number, table: String, user: any, callback: any) => {
  const id_string = table == 'STUDENT' ? 'STUDENT_ID' : 'LIBRARIAN_ID';

  const selectionQuery = `SELECT USERNAME, LIBRARY_NAME FROM ${table} WHERE ${id_string}=?`;

  db.execute(selectionQuery, [id], (err, result) => {
    const resultArr = <RowDataPacket> result;

    if (!err) {
      if (resultArr.length > 0) {
        const {USERNAME, LIBRARY_NAME} = resultArr[0];
        if (USERNAME == user.username && LIBRARY_NAME == user.library) callback('same');
        else callback('diff');
      }
      else {
        callback('dne');
      }
    }
    else {
      callback('error');
    }
  });
}