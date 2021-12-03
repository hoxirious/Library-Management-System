import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { authRouter } from './auth';
import { itemsRouter } from './items';

export const router = express.Router();

router.use('/api', authenticateJWT);

router.use('/api', authRouter);
router.use('/api', itemsRouter);