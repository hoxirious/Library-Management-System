import express from 'express';
import { minimumRoleRequired, onlyForSelf } from '../middleware/auth';
import * as studentController from '../controllers/student';

export const studentRouter = express.Router();

studentRouter.post('/students', studentController.addStudent);

studentRouter.patch('/students/:student_id', onlyForSelf(true, true), studentController.editStudent);

studentRouter.get('/students', minimumRoleRequired('LIBRARIAN'), studentController.getAllStudents);

studentRouter.get('/students/:student_id', onlyForSelf(true, true), studentController.getStudentFromID);