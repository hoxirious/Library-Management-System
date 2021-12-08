import express from 'express';
import { minimumRoleRequired } from '../middleware/auth';
import * as libraryController from '../controllers/library';

export const libraryRouter = express.Router();

libraryRouter.post('/libraries', minimumRoleRequired('SYSADMIN'), libraryController.addLibrary);

libraryRouter.get('/libraries', libraryController.getAllLibraries);