import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const getAllAuthors = (req: Request, res: Response) => {
  db.query(`SELECT * FROM AUTHOR`, (err, result) => {
    const resultArr = <RowDataPacket> result;

    res.status(200).json(resultArr.map((e: any) => {
      return formatGetOutput(e);
    }));
  });
}

const formatGetOutput = (e: any): any => {
  return {
    "author_id": e.A_ID,
    "name": e.NAME
  };
}