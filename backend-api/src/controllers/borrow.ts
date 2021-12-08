import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const addItemToBorrowed = (req: Request, res: Response) => {
  const {student_id, item_id, date} = req.body;

  if (student_id && item_id && date) {
    db.execute(`SELECT * FROM BORROW WHERE STUDENT_ID=? AND ITEM_ID=?`, [student_id, item_id], (err, result) => {
      if (!err && (<RowDataPacket> result).length == 0) {
        db.execute(`SELECT AVAILABLE FROM ITEM WHERE ITEM_ID=?`, [item_id], (err, result) => {
          const resultArr = <RowDataPacket> result;
          if (!err && resultArr.length > 0) {
            const amount = resultArr[0].AVAILABLE;
            if (amount > 0) {
              db.execute(`UPDATE ITEM SET AVAILABLE=AVAILABLE-1 WHERE ITEM_ID=?`, [item_id]);
              db.execute(`INSERT INTO BORROW VALUES (?, ?, ?, 0)`, [student_id, item_id, date], err => {
                if (!err) {
                  res.location(`/api/borrowed/${student_id}/${item_id}`)
                  res.sendStatus(201);
                }
                else {
                  res.status(400).send("Invalid data for request.");
                }
              });
            }
            else {
              res.status(403).send("This item has no more copies available.");
            }
          }
          else {
            res.status(400).send("Item does not exist.");
          }
        });
  
        
      }
      else {
        res.status(403).send("This item is already borrowed by this student.");
      }
    });
  }
  else {
    res.status(400).send("Invalid data for request.");
  }
}

export const getAllBorrowed = (req: Request, res: Response) => {
  const student_id = req.params.student_id;

  db.query(`SELECT * FROM BORROW`, (err, result) => {
    let resultArr = <RowDataPacket> result;

    resultArr = resultArr.map((e: any) => {
      return formatGetOutput(e);
    });

    if (student_id) {
      resultArr = resultArr.filter((e: any) => {
        return e.student_id == student_id;
      });
      if (resultArr.length == 0) res.status(404).send("Student does not have any borrowed items.");
      else res.status(200).json(resultArr);
    }
    else res.status(200).json(resultArr);
  });
}

export const getBorrowedFromID = (req: Request, res: Response) => {
  const student_id = req.params.student_id;
  const item_id = req.params.item_id;

  db.execute(`SELECT * FROM BORROW WHERE STUDENT_ID=? AND ITEM_ID=?`, [student_id, item_id], (err, result) => {
    const resultArr = <RowDataPacket> result;
    if (!err && resultArr.length > 0) {
      res.status(200).json(formatGetOutput(resultArr[0]));
    }
    else {
      res.status(404).send("Entry does not exist in borrowed items.");
    }
  });
}

const formatGetOutput = (e: any): any => {
  return {
    "student_id": e.STUDENT_ID,
    "item_id": e.ITEM_ID,
    "date": e.BORROWDATE,
    "overdue": e.OVERDUE[0] == 1
  };
}