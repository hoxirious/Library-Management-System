import { db } from '../services/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const addItem = (req: Request, res: Response) => {
  const {name, amount, location, library, pub_id, type, genre, author_id, pages, length} = req.body;

  if (name && amount && typeof location != 'undefined' && library && pub_id && type && genre
  && author_id && pages && length) {
    const insertItemQuery = `INSERT INTO ITEM (NAME, AVAILABLE, LOCATIONCODE, LIBRARY_NAME, PUB_ID) 
    VALUES (?, ?, ?, ?, ?)`;
  
    if ((type == "book" && author_id != null && pages != null) || 
    (type == "cd" && length != null) || (type == "magazine" && pages != null)) {
      const a_id = type == "book" ? author_id : 0;
      db.execute(`SELECT * FROM AUTHOR WHERE A_ID=?`, [a_id], (err, result) => {
        if (!err && (((<RowDataPacket> result).length > 0) || type != "book")) {
          db.execute(insertItemQuery, [name, amount, location, library, pub_id], err => {
            if (!err) {
              db.query(`SELECT LAST_INSERT_ID() AS ID`, (err, result) => {
                const item_id = (<RowDataPacket> result)[0].ID;
                const info = type == "book" || type == "magazine" ? pages : length;
                db.execute(`INSERT INTO ${type} VALUES (?, ?)`, [item_id, info]);
                if (type == "book") {
                  db.execute(`INSERT INTO WRITES VALUES (?, ?)`, [a_id, item_id]);
                }
                db.execute(`INSERT INTO GENRE VALUES (?, ?)`, [item_id, genre]);
                res.location('/api/items/' + item_id);
                res.status(201).json({ item_id: item_id });
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
      });
    }
    else {
      res.status(400).send("Invalid data for request.");
    }
  }
  else {
    res.status(400).send("Invalid data for request.");
  }
}

export const editItem = (req: Request, res: Response) => {
  const item_id = req.params.item_id;
  db.execute(`SELECT * FROM ITEM WHERE ITEM_ID=?`, [item_id], (err, result) => {
    if (!err && (<RowDataPacket> result).length > 0) {
      const {name, amount, location, library, pub_id, type, genre, author_id, pages, length} = req.body;

      if (name && amount && typeof location != 'undefined' && library && pub_id && type && genre
      && author_id && pages && length) {
        const editItemQuery = `UPDATE ITEM SET NAME=?, AVAILABLE=?, LOCATIONCODE=?, LIBRARY_NAME=?, PUB_ID=? 
        WHERE ITEM_ID=?`;
  
        if ((type == "book" && author_id != null && pages != null) || 
        (type == "cd" && length != null) || (type == "magazine" && pages != null)) {
          const a_id = type == "book" ? author_id : 0;
          db.execute(`SELECT * FROM AUTHOR WHERE A_ID=?`, [a_id], (err, result) => {
            if (!err && (((<RowDataPacket> result).length > 0) || type != "book")) {
              db.execute(editItemQuery, [name, amount, location, library, pub_id, item_id], err => {
                if (!err) {
                  db.execute(`DELETE FROM WRITES WHERE BOOK_ID=?`, [item_id]);
                  db.execute(`DELETE FROM BOOK WHERE BOOK_ID=?`, [item_id]);
                  db.execute(`DELETE FROM CD WHERE CD_ID=?`, [item_id]);
                  db.execute(`DELETE FROM MAGAZINE WHERE MAGAZINE_ID=?`, [item_id]);
  
                  if (type == "book") {
                    db.execute(`INSERT INTO BOOK VALUES (?, ?)`, [item_id, pages]);
                    db.execute(`INSERT INTO WRITES VALUES (?, ?)`, [a_id, item_id]);
                  }
                  else if (type == "cd") {
                    db.execute(`INSERT INTO CD VALUES (?, ?)`, [item_id, length]);
                  }
                  else if (type == "magazine") {
                    db.execute(`INSERT INTO MAGAZINE VALUES (?, ?)`, [item_id, pages]);
                  }
                  db.execute(`UPDATE GENRE SET GENRE=? WHERE ITEM_ID=?`, [genre, item_id]);
                  res.sendStatus(200);
                }
                else {
                  res.status(400).send("Invalid data for request.");
                }
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
      else {
        res.status(400).send("Invalid data for request.");
      }
    }
    else {
      res.status(404).send("Item does not exist.");
    }
  });
}

export const deleteItem = (req: Request, res: Response) => {
  const item_id = req.params.item_id;

  db.execute(`SELECT * FROM ITEM WHERE ITEM_ID=?`, [item_id], (err, result) => {
    if (!err && (<RowDataPacket> result).length > 0) {
      db.execute(`DELETE FROM FINE WHERE ITEM_ID=?`, [item_id]);
      db.execute(`DELETE FROM RETURN1 WHERE ITEM_ID=?`, [item_id]);
      db.execute(`DELETE FROM BORROW WHERE ITEM_ID=?`, [item_id]);
      db.execute(`DELETE FROM GENRE WHERE ITEM_ID=?`, [item_id]);
      db.execute(`DELETE FROM WRITES WHERE BOOK_ID=?`, [item_id]);
      db.execute(`DELETE FROM BOOK WHERE BOOK_ID=?`, [item_id]);
      db.execute(`DELETE FROM CD WHERE CD_ID=?`, [item_id]);
      db.execute(`DELETE FROM MAGAZINE WHERE MAGAZINE_ID=?`, [item_id]);
      db.execute(`DELETE FROM ITEM WHERE ITEM_ID=?`, [item_id]);
      res.sendStatus(200);
    }
    else {
      res.status(404).send("Item does not exist.");
    }
  });
}

export const getAllItems = (req: Request, res: Response) => {
  const selectionQuery = `SELECT ITEM_ID, NAME, AVAILABLE, LOCATIONCODE, LIBRARY_NAME, PUB_ID,
  GENRE, AUTHOR_ID, BOOK.BOOK_ID, BOOK.PAGES AS BPAGES, MAGAZINE.PAGES AS MPAGES, CD_ID, LENGTH, MAGAZINE_ID
  FROM ITEM NATURAL JOIN GENRE 
  LEFT JOIN WRITES ON ITEM.ITEM_ID=WRITES.BOOK_ID
  LEFT JOIN BOOK ON ITEM.ITEM_ID=BOOK.BOOK_ID
  LEFT JOIN CD ON ITEM.ITEM_ID=CD.CD_ID
  LEFT JOIN MAGAZINE ON ITEM.ITEM_ID=MAGAZINE.MAGAZINE_ID`;

  db.query(selectionQuery, (err, result) => {
    let resultArr = <RowDataPacket> result;
    const numOfParams = Object.keys(req.query).length;
    const nameParam = req.query.name;
    const typeParam = req.query.type;
    const genreParam = req.query.genre;
    
    resultArr = resultArr.map((e: any) => {
      return formatGetOutput(e);
    });

    if (numOfParams == 0) {
      res.status(200).json(resultArr);
    }
    else if (numOfParams == 1) {
      if (typeof nameParam == "string") {
        resultArr = resultArr.filter((e: any) => {
          return e.name.toLowerCase().includes(nameParam.toLowerCase());
        });
        res.status(200).json(resultArr);
      }
      else if (typeof typeParam == "string") {
        resultArr = resultArr.filter((e: any) => {
          return e.type == typeParam.toLowerCase();
        });
        res.status(200).json(resultArr);
      }
      else if (typeof genreParam == "string") {
        resultArr = resultArr.filter((e: any) => {
          return e.genre.toLowerCase() == genreParam.toLowerCase();
        });
        res.status(200).json(resultArr);
      }
      else {
        res.status(400).send("Invalid parameters.")
      }
    }
    else {
      res.status(400).send("Invalid parameters.")
    }
  });
}

export const getItemFromID = (req: Request, res: Response) => {
  const item_id = req.params.item_id;

  const selectionQuery = `SELECT ITEM_ID, NAME, AVAILABLE, LOCATIONCODE, LIBRARY_NAME, PUB_ID,
  GENRE, AUTHOR_ID, BOOK.BOOK_ID, BOOK.PAGES AS BPAGES, MAGAZINE.PAGES AS MPAGES, CD_ID, LENGTH, MAGAZINE_ID
  FROM ITEM NATURAL JOIN GENRE 
  LEFT JOIN WRITES ON ITEM.ITEM_ID=WRITES.BOOK_ID
  LEFT JOIN BOOK ON ITEM.ITEM_ID=BOOK.BOOK_ID
  LEFT JOIN CD ON ITEM.ITEM_ID=CD.CD_ID
  LEFT JOIN MAGAZINE ON ITEM.ITEM_ID=MAGAZINE.MAGAZINE_ID
  WHERE ITEM_ID=?`;

  db.execute(`SELECT * FROM ITEM WHERE ITEM_ID=?`, [item_id], (err, result) => {
    if (!err && (<RowDataPacket> result).length > 0) {
      db.execute(selectionQuery, [item_id], (err, result) => {
        const e = (<RowDataPacket> result)[0];

        res.status(200).json(formatGetOutput(e));
      });
    }
    else {
      res.status(404).send("Item does not exist.");
    }
  });
}

const formatGetOutput = (e: any): any => {
  let type: String;

  if (e.BOOK_ID) type = "book";
  else if (e.CD_ID) type = "cd";
  else type = "magazine";

  const pages = type == "book" ? e.BPAGES : e.MPAGES;

  return {
    "item_id": e.ITEM_ID,
    "name": e.NAME,
    "amount": e.AVAILABLE,
    "location": e.LOCATIONCODE,
    "library": e.LIBRARY_NAME,
    "pub_id": e.PUB_ID,
    "type": type,
    "genre": e.GENRE,
    "author_id": e.AUTHOR_ID,
    "pages": pages,
    "length": e.LENGTH
  };
}