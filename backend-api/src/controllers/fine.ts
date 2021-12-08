import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const addFine = (req: Request, res: Response) => {
  const {student_id, item_id, amount, charge_date} = req.body;

  if (student_id && item_id && typeof amount != 'undefined' && charge_date) {
    const insertQuery = `INSERT INTO FINE (STUDENT_ID, ITEM_ID, AMOUNT, CHARGE_DATE, PAY_DATE) VALUES (?,?,?,?,NULL)`;
  
    db.execute(insertQuery, [student_id, item_id, amount, charge_date], err => {
      if (!err) {
        db.query(`SELECT LAST_INSERT_ID() AS ID`, (err, result) => {
          const id = (<RowDataPacket> result)[0].ID;
          res.status(201).json( {fine_id: id });
        });
      }
      else {
        res.status(400).send("Invalid data for request.");
      }
    });
  }
  else {
    res.status(400).send("Invalid data for request.");
  }
}

export const addPayDate = (req: Request, res: Response) => {
  const fine_id = req.params.fine_id;

  db.execute(`SELECT STUDENT_ID FROM FINE WHERE FINE_ID=? AND PAY_DATE IS NULL`, [fine_id], (err, result) => {
    const resultArr = <RowDataPacket> result;

    if (!err && resultArr.length > 0) {
      const student_id = resultArr[0].STUDENT_ID;
      const {role} = res.locals.user;
      const {pay_date} = req.body;
      const errString = `You do not have the necessary permissions to perform this action.
      You are authenticated as STUDENT, and thus can only pay fines for yourself.`;
      
      if (pay_date) {
        if (role == "LIBRARIAN" || role == "SYSADMIN") {
          db.execute(`UPDATE FINE SET PAY_DATE=? WHERE FINE_ID=?`, [pay_date, fine_id]);
          res.status(200).json({ fine_id: fine_id });
        }
        else {
          const {username, library} = res.locals.user;
          db.execute(`SELECT STUDENT_ID FROM STUDENT WHERE USERNAME=? AND LIBRARY_NAME=?`, [username, library], (err, result) => {
            const student_id2 = (<RowDataPacket> result)[0].STUDENT_ID;
            if (student_id == student_id2) {
              db.execute(`UPDATE FINE SET PAY_DATE=? WHERE FINE_ID=?`, [pay_date, fine_id]);
              res.status(200).json({ fine_id: fine_id });
            }
            else {
              res.status(403).send(errString);
            }
          });
        }
      }
      else {
        res.status(400).send("Invalid data for request.");
      }
    }
    else {
      res.status(404).send("Fine does not exist, or is already paid.")
    }
  });
}

export const getAllFines = (req: Request, res: Response) => {
  db.query(`SELECT * FROM FINE`, (err, result) => {
    const resultArr = <RowDataPacket> result;

    res.status(200).json(resultArr.map((e: any) => {
      return formatGetOutput(e);
    }));
  });
}

export const getAllFinesForStudent = (req: Request, res: Response) => {
  const student_id = req.params.student_id;
  const unpaid = req.query.unpaid == '';

  db.execute(`SELECT * FROM FINE WHERE STUDENT_ID=?`, [student_id], (err, result) => {
    let resultArr = (<RowDataPacket> result).map((e: any) => {
      return formatGetOutput(e);
    });
    
    if (!err) {
      if (unpaid) {
        resultArr = resultArr.filter((e: any) => {
          return e.pay_date == null;
        });
      }
      res.status(200).json(resultArr);
    }
    else {
      res.status(400).send("Invalid data for request.");
    }
  });
}

export const getUnpaidFineAmountForStudent = (req: Request, res: Response) => {
  const student_id = req.params.student_id;

  db.execute(`SELECT * FROM FINE WHERE STUDENT_ID=?`, [student_id], (err, result) => {
    const resultArr = <RowDataPacket> result;
    let total = 0;

    resultArr.forEach((e: any) => {
      total += e.PAY_DATE == null ? e.AMOUNT : 0;
    });
    
    res.status(200).json({ total: total });
  });
}

const formatGetOutput = (e: any): any => {
  return {
    "fine_id": e.FINE_ID,
    "student_id": e.STUDENT_ID,
    "item_id": e.ITEM_ID,
    "amount": e.AMOUNT,
    "charge_date": e.CHARGE_DATE,
    "pay_date": e.PAY_DATE
  };
}