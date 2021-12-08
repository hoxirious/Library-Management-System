import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const addStudent = (req: Request, res: Response) => {
  const {name, faculty, phone, username, password, library} = req.body;

  if (name && faculty && phone && username && password && library) {
    db.execute(`SELECT * FROM LOGIN WHERE USERNAME=? AND LIBRARY_NAME=?`, [username, library], (err, result) => {
      if (!err && (<RowDataPacket> result).length == 0) {
        db.execute(`INSERT INTO LOGIN VALUES (?, ?, ?, 'STUDENT')`, [username, library, password], err => {
          if (!err) {
            const insertQuery = `INSERT INTO STUDENT (NAME, FACULTY, PHONE, USERNAME, LIBRARY_NAME) VALUES (?,?,?,?,?)`;
            db.execute(insertQuery, [name, faculty, phone, username, library], err => {
              db.query(`SELECT LAST_INSERT_ID() AS ID`, (err, result) => {
                const id = (<RowDataPacket> result)[0].ID;
                res.location('/api/students/' + id);
                res.status(201).json({ student_id: id });
              });
            });
          }
          else {
            console.log(err);
            res.status(400).send("Invalid data for request.");
          }
        });
      }
      else {
        res.status(403).send("Username already taken.");
      }
    });
  }
  else {
    res.status(400).send("Invalid data for request.");
  }
}

export const editStudent = (req: Request, res: Response) => {
  const student_id = req.params.student_id;
  const {name, faculty, phone} = req.body;

  if (name && faculty && phone) {
    db.execute(`SELECT * FROM STUDENT WHERE STUDENT_ID=?`, [student_id], (err, result) => {
      if (!err && (<RowDataPacket> result).length > 0) {
        db.execute(`UPDATE STUDENT SET NAME=?, FACULTY=?, PHONE=? WHERE STUDENT_ID=?`, [name, faculty, phone, student_id]);
        res.sendStatus(200);
      }
      else {
        res.status(404).send("Student does not exist.");
      }
    });
  }
  else {
    res.status(400).send("Invalid data for request.");
  }
}

export const getAllStudents = (req: Request, res: Response) => {
  db.query(`SELECT * FROM STUDENT`, (err, result) => {
    const resultArr = <RowDataPacket> result;

    res.status(200).json(resultArr.map((e: any) => {
      return formatGetOutput(e);
    }));
  });
}

export const getStudentFromID = (req: Request, res: Response) => {
  const student_id = req.params.student_id;

  db.execute(`SELECT * FROM STUDENT WHERE STUDENT_ID=?`, [student_id], (err, result) => {
    const resultArr = <RowDataPacket> result;
    if (!err && resultArr.length > 0) {
      res.status(200).json(formatGetOutput(resultArr[0]));
    }
    else {
      res.status(404).send("Student does not exist.");
    }
  });
}

const formatGetOutput = (e: any): any => {
  return {
    "student_id": e.STUDENT_ID,
    "name": e.NAME,
    "faculty": e.FACULTY,
    "phone": e.PHONE,
    "username": e.USERNAME
  };
}