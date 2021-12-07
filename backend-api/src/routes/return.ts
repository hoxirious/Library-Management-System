import express from 'express';
import { minimumRoleRequired, onlyForSelf } from '../middleware/auth';
import * as returnController from '../controllers/return';

export const returnRouter = express.Router();

returnRouter.post('/returned', onlyForSelf(true, false), returnController.addItemToReturned);

returnRouter.get('/returned', minimumRoleRequired('LIBRARIAN'), returnController.getAllReturns);

returnRouter.get('/returned/:student_id', onlyForSelf(true, true), returnController.getAllReturns);