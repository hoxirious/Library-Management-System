CREATE TABLE LIBRARY (NAME varchar(255) NOT NULL, LOCATION VARCHAR(255) NOT NULL, PRIMARY KEY (NAME));
CREATE TABLE PUBLISHER (PUB_ID INT NOT NULL AUTO_INCREMENT, NAME VARCHAR(255) NOT NULL, PRIMARY KEY (PUB_ID));
CREATE TABLE AUTHOR (A_ID INT NOT NULL AUTO_INCREMENT, NAME VARCHAR(255) NOT NULL, PRIMARY KEY (A_ID));
CREATE TABLE ITEM (ITEM_ID INT NOT NULL AUTO_INCREMENT, NAME varchar(255) NOT NULL, AVAILABLE INT, LOCATIONCODE INT, LIBRARY_NAME varchar(255) NOT NULL, 
                   PUB_ID INT,
                   FOREIGN KEY (LIBRARY_NAME) REFERENCES LIBRARY(NAME),
                  FOREIGN KEY (PUB_ID) REFERENCES PUBLISHER(PUB_ID),
                  PRIMARY KEY (ITEM_ID));
CREATE TABLE BOOK (BOOK_ID INT NOT NULL, PAGES INT, FOREIGN KEY (BOOK_ID) REFERENCES ITEM(ITEM_ID), PRIMARY KEY (BOOK_ID));
CREATE TABLE CD (CD_ID INT NOT NULL, LENGTH INT, FOREIGN KEY (CD_ID) REFERENCES ITEM(ITEM_ID), PRIMARY KEY (CD_ID));
CREATE TABLE MAGAZINE (MAGAZINE_ID INT NOT NULL, PAGES INT, FOREIGN KEY (MAGAZINE_ID) REFERENCES ITEM(ITEM_ID), PRIMARY KEY (MAGAZINE_ID));
CREATE TABLE WRITES (AUTHOR_ID INT NOT NULL, BOOK_ID INT NOT NULL,
                    FOREIGN KEY (AUTHOR_ID) REFERENCES AUTHOR(A_ID),
                    FOREIGN KEY (BOOK_ID) REFERENCES BOOK(BOOK_ID),
                   PRIMARY KEY (AUTHOR_ID, BOOK_ID ));
CREATE TABLE GENRE (ITEM_ID INT NOT NULL, GENRE VARCHAR(255),
                    FOREIGN KEY (ITEM_ID) REFERENCES ITEM(ITEM_ID),
                   PRIMARY KEY (ITEM_ID, GENRE));
CREATE TABLE LOGIN (USERNAME VARCHAR(255) NOT NULL, LIBRARY_NAME VARCHAR(255) NOT NULL, PASSWORD VARCHAR(255), USERTYPE VARCHAR(255),
                   FOREIGN KEY (LIBRARY_NAME) REFERENCES LIBRARY(NAME),
                   PRIMARY KEY (USERNAME, LIBRARY_NAME));
CREATE TABLE LIBRARIAN (LIBRARIAN_ID INT NOT NULL AUTO_INCREMENT, LIBRARY_NAME VARCHAR(255) NOT NULL, NAME VARCHAR(255), USERNAME VARCHAR(255) NOT NULL, 
                        FOREIGN KEY (USERNAME, LIBRARY_NAME) REFERENCES LOGIN(USERNAME, LIBRARY_NAME),
                        PRIMARY KEY (LIBRARIAN_ID));
CREATE TABLE STUDENT (STUDENT_ID INT NOT NULL AUTO_INCREMENT, NAME VARCHAR(255), FACULTY VARCHAR(255) NOT NULL, PHONE VARCHAR(255),
                      USERNAME VARCHAR(255) NOT NULL, LIBRARY_NAME VARCHAR(255) NOT NULL,
                        FOREIGN KEY (USERNAME, LIBRARY_NAME) REFERENCES LOGIN(USERNAME, LIBRARY_NAME),
                        PRIMARY KEY (STUDENT_ID));
CREATE TABLE BORROW (STUDENT_ID INT NOT NULL,ITEM_ID INT NOT NULL, BORROWDATE DATE , OVERDUE BIT,
                        FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID),
                    	FOREIGN KEY (ITEM_ID) REFERENCES ITEM(ITEM_ID),
                    	PRIMARY KEY (STUDENT_ID, ITEM_ID));
CREATE TABLE RETURN1 (STUDENT_ID INT NOT NULL, ITEM_ID INT NOT NULL, BORROWDATE DATE , RETURNDATE DATE,
                        FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID),
                    	FOREIGN KEY (ITEM_ID) REFERENCES ITEM(ITEM_ID),
                    	PRIMARY KEY (STUDENT_ID, ITEM_ID, BORROWDATE ));
CREATE TABLE FINE (FINE_ID INT NOT NULL AUTO_INCREMENT, STUDENT_ID INT NOT NULL, ITEM_ID INT NOT NULL, AMOUNT FLOAT, CHARGE_DATE DATE NOT NULL, PAY_DATE DATE,
                   FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID),
                   FOREIGN KEY (ITEM_ID) REFERENCES ITEM(ITEM_ID),
                   PRIMARY KEY (FINE_ID));
