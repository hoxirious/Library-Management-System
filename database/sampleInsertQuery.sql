INSERT INTO LIBRARY (name, location ) VALUES ('LIBRARY0', 'Calgary');
INSERT INTO LIBRARY (name, location ) VALUES ('LIBRARY1', 'Vancouver');
INSERT INTO LIBRARY (name, location ) VALUES ('LIBRARY2', 'Toronto');

-- PUBLISHER ID STARTS WITH 1
INSERT INTO PUBLISHER VALUES (10, 'PUBLISHER0');
INSERT INTO PUBLISHER VALUES (11, 'PUBLISHER1');
INSERT INTO PUBLISHER VALUES (12, 'PUBLISHER2');

-- AUTHOR ID STARTS WITH 2
INSERT INTO AUTHOR VALUES (20, 'AUTHOR0');
INSERT INTO AUTHOR VALUES (21, 'AUTHOR1');
INSERT INTO AUTHOR VALUES (22, 'AUTHOR2');

-- ITEM ID STARTS WITH 3, LOCATION CODE START WITH 4
INSERT INTO ITEM VALUES (30, 'Test Book0', 1 , 40 ,'LIBRARY0', 10);
INSERT INTO ITEM VALUES (31, 'Test Book1', 2 , 40 ,'LIBRARY0', 10);
INSERT INTO ITEM VALUES (32, 'Test Book2', 3 , 40 ,'LIBRARY0', 11);
INSERT INTO ITEM VALUES (33, 'Test CD', 2 , 41 ,'LIBRARY0', 11);
INSERT INTO ITEM VALUES (34, 'Test Magazine', 1, 42, 'LIBRARY0', 12);

INSERT INTO BOOK VALUES (30, 100);
INSERT INTO BOOK VALUES (31, 200);
INSERT INTO BOOK VALUES (32, 456);
INSERT INTO CD VALUES (33, 20);
INSERT INTO MAGAZINE VALUES (34, 69);
  
INSERT INTO WRITES VALUES (20, 30);
INSERT INTO WRITES VALUES (21, 31);
INSERT INTO WRITES VALUES (22, 32);

INSERT INTO GENRE VALUES (30, 'Fantasy');
INSERT INTO GENRE VALUES (31, 'Science Fiction');
INSERT INTO GENRE VALUES (32, 'Mystery');
INSERT INTO GENRE VALUES (33, 'Mystery');
INSERT INTO GENRE VALUES (34, 'Culture');

INSERT INTO LOGIN VALUES ('student', 'LIBRARY0','password','STUDENT');
INSERT INTO LOGIN VALUES ('librarian', 'LIBRARY0','password','LIBRARIAN');
INSERT INTO LOGIN VALUES ('admin', 'LIBRARY0','password', 'SYSADMIN');

-- LIRARIAN ID STARTS WITH 5
INSERT INTO LIBRARIAN VALUES (50, 'LIBRARY0','Test Librarian','librarian');
INSERT INTO LIBRARIAN VALUES (51, 'LIBRARY0','Test Sysadmin','admin');

-- STUDENT ID STARTS WITH 6
INSERT INTO STUDENT VALUES (60, 'Test Student','Science','123-456-7890', 'student');

INSERT INTO BORROW VALUES (60, 30, '2021-12-01', 0);

INSERT INTO RETURN1 VALUES (60, 31, '2021-5-02', '2021-7-07');

-- FINE ID STARTS WITH 7
INSERT INTO FINE VALUES (70, 60, 31, 5, '2021-7-07','2021-7-10');