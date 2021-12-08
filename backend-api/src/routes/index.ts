import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { authRouter } from './auth';
import { itemsRouter } from './items';
import { borrowRouter } from './borrow';
import { returnRouter } from './return';
import { librarianRouter } from './librarian';
import { studentRouter } from './student';
import { libraryRouter } from './library';

export const router = express.Router();

router.use(authenticateJWT);

router.use(authRouter);
router.use(itemsRouter);
router.use(borrowRouter);
router.use(returnRouter);
router.use(librarianRouter);
router.use(studentRouter);
router.use(libraryRouter);