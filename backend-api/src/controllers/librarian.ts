import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const addLibrarian = (req: Request, res: Response) => {
  const {library, name, username} = req.body;

  db.execute(`SELECT * FROM LOGIN WHERE USERNAME=? AND LIBRARY_NAME=?`, [username, library], (err, result) => {
    if (!err && (<RowDataPacket> result).length == 0) {
      db.execute(`INSERT INTO LOGIN VALUES (?, ?, 'temppass', 'LIBRARIAN')`, [username, library], err => {
        if (!err) {
          const insertQuery = `INSERT INTO LIBRARIAN (LIBRARY_NAME, NAME, USERNAME) VALUES (?, ?, ?)`;
          db.execute(insertQuery, [library, name, username], err => {
            db.query(`SELECT LAST_INSERT_ID() AS ID`, (err, result) => {
              const id = (<RowDataPacket> result)[0].ID;
              res.location('/api/librarians/' + id);
              res.status(201).json({ librarian_id: id });
            });
          });
        }
        else {
          res.status(400).send("Invalid data for request.");
        }
      });
    }
    else {
      res.status(403).send("Username already taken.");
    }
  });
}

export const editLibrarian = (req: Request, res: Response) => {
  const librarian_id = req.params.librarian_id;
  db.execute(`SELECT * FROM LIBRARIAN WHERE LIBRARIAN_ID=?`, [librarian_id], (err, result) => {
    if (!err && (<RowDataPacket> result).length > 0) {
      const {name} = req.body;
      db.execute(`UPDATE LIBRARIAN SET NAME=? WHERE LIBRARIAN_ID=?`, [name, librarian_id]);
      res.sendStatus(200);
    }
    else {
      res.status(404).send("Librarian does not exist.");
    }
  });
}

export const getAllLibrarians = (req: Request, res: Response) => {
  db.query(`SELECT * FROM LIBRARIAN`, (err, result) => {
    let resultArr = <RowDataPacket> result;

    res.status(200).json(resultArr.map((e: any) => {
      return formatGetOutput(e);
    }));
  });
}

export const getLibrarianFromID = (req: Request, res: Response) => {
  const librarian_id = req.params.librarian_id;

  db.execute(`SELECT * FROM LIBRARIAN WHERE LIBRARIAN_ID=?`, [librarian_id], (err, result) => {
    const resultArr = <RowDataPacket> result;
    if (!err && resultArr.length > 0) {
      res.status(200).json(formatGetOutput(resultArr[0]));
    }
    else {
      res.status(404).send("Librarian does not exist.");
    }
  });
}

const formatGetOutput = (e: any): any => {
  return {
    "librarian_id": e.LIBRARIAN_ID,
    "library": e.LIBRARY_NAME,
    "name": e.NAME,
    "username": e.USERNAME
  };
}