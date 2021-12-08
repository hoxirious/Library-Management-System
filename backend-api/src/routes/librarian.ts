import express from 'express';
import { minimumRoleRequired, onlyForSelf } from '../middleware/auth';
import * as librarianController from '../controllers/librarian';

export const librarianRouter = express.Router();

librarianRouter.post('/librarians', minimumRoleRequired('SYSADMIN'), librarianController.addLibrarian);

librarianRouter.patch('/librarians/:librarian_id', onlyForSelf(false, true), librarianController.editLibrarian);

librarianRouter.get('/librarians', minimumRoleRequired('SYSADMIN'), librarianController.getAllLibrarians);

librarianRouter.get('/librarians/:librarian_id', onlyForSelf(false, true), librarianController.getLibrarianFromID);