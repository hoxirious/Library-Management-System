import express from 'express';
import * as publisherController from '../controllers/publisher';

export const publisherRouter = express.Router();

publisherRouter.get('/publishers', publisherController.getAllPublishers);