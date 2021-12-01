import express from 'express';
import * as authController from '../controllers/auth';

export const authRouter = express.Router();

authRouter.post('/login', authController.login);
