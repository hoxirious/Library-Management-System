import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const addLibrary = (req: Request, res: Response) => {
  const {name, location} = req.body;

  db.execute(`INSERT INTO LIBRARY VALUES (?, ?)`, [name, location], err => {
    if (!err) {
      res.status(201).json({ name: name });
    }
    else {
      res.status(400).send("Library already exists, or invalid data for request.")
    }
  });
}

export const getAllLibraries = (req: Request, res: Response) => {
  db.query(`SELECT * FROM LIBRARY`, (err, result) => {
    let resultArr = <RowDataPacket> result;

    res.status(200).json(resultArr.map((e: any) => {
      return formatGetOutput(e);
    }));
  });
}

const formatGetOutput = (e: any): any => {
  return {
    "name": e.NAME,
    "location": e.LOCATION
  };
}