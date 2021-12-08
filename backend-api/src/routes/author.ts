import express from 'express';
import * as authorController from '../controllers/author';

export const authorRouter = express.Router();

authorRouter.get('/authors', authorController.getAllAuthors);