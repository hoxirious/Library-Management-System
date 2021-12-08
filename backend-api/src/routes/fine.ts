import express from 'express';
import { minimumRoleRequired, onlyForSelf } from '../middleware/auth';
import * as fineController from '../controllers/fine';

export const fineRouter = express.Router();

fineRouter.post('/fines', minimumRoleRequired('LIBRARIAN'), fineController.addFine);

fineRouter.patch('/fines/:fine_id', fineController.addPayDate);

fineRouter.get('/fines', minimumRoleRequired('LIBRARIAN'), fineController.getAllFines);

fineRouter.get('/fines/:student_id', onlyForSelf(true, true), fineController.getAllFinesForStudent);

fineRouter.get('/fines/:student_id/unpaid-total', onlyForSelf(true, true), fineController.getUnpaidFineAmountForStudent);