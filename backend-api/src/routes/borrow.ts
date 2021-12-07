import express from 'express';
import { minimumRoleRequired, onlyForSelf } from '../middleware/auth';
import * as borrowController from '../controllers/borrow';

export const borrowRouter = express.Router();

borrowRouter.post('/borrowed', onlyForSelf(true, false), borrowController.addItemToBorrowed);

borrowRouter.get('/borrowed', minimumRoleRequired('LIBRARIAN'), borrowController.getAllBorrowed);

borrowRouter.get('/borrowed/:student_id/:item_id', onlyForSelf(true, true), borrowController.getBorrowedFromID);

borrowRouter.get('/borrowed/:student_id', onlyForSelf(true, true), borrowController.getAllBorrowed);