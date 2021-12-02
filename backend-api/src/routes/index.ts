import express from 'express';
import { authRouter } from './auth';
import { authenticateJWT } from '../middleware/auth';

export const router = express.Router();

router.use('/api', authenticateJWT);

router.use('/api', authRouter);