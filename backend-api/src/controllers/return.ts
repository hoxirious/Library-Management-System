import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const addItemToReturned = (req: Request, res: Response) => {
  const {student_id, item_id, borrow_date, return_date} = req.body;

  db.execute(`SELECT * FROM BORROW WHERE STUDENT_ID=? AND ITEM_ID=?`, [student_id, item_id], (err, result) => {
    if (!err && (<RowDataPacket> result).length > 0) {
      db.execute(`UPDATE ITEM SET AVAILABLE=AVAILABLE+1 WHERE ITEM_ID=?`, [item_id]);
      db.execute(`DELETE FROM BORROW WHERE STUDENT_ID=? AND ITEM_ID=?`, [student_id, item_id]);
      db.execute(`INSERT INTO RETURN1 VALUES (?, ?, ?, ?)`, [student_id, item_id, borrow_date, return_date], err => {
        if (!err) res.sendStatus(201);
        else res.status(400).send("Invalid data for request.");
      });
    }
    else {
      res.status(404).send("Can't return item that is not borrowed.");
    }
  });
}

export const getAllReturns = (req: Request, res: Response) => {
  const student_id = req.params.student_id;

  db.query(`SELECT * FROM RETURN1`, (err, result) => {
    let resultArr = <RowDataPacket> result;

    resultArr = resultArr.map((e: any) => {
      return formatGetOutput(e);
    });

    if (student_id) {
      resultArr = resultArr.filter((e: any) => {
        return e.student_id == student_id;
      });
      if (resultArr.length == 0) res.status(404).send("Student does not have any returns.");
      else res.status(200).json(resultArr);
    }
    else res.status(200).json(resultArr);
  });
}

const formatGetOutput = (e: any): any => {
  return {
    "student_id": e.STUDENT_ID,
    "item_id": e.ITEM_ID,
    "borrow_date": e.BORROWDATE,
    "return_date": e.RETURNDATE
  };
}