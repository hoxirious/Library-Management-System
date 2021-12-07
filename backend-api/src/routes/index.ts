import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { authRouter } from './auth';
import { itemsRouter } from './items';
import { borrowRouter } from './borrow';

export const router = express.Router();

router.use('/api', authenticateJWT);

router.use('/api', authRouter);
router.use('/api', itemsRouter);
router.use('/api', borrowRouter);