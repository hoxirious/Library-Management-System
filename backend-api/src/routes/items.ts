import express from 'express';
import { minimumRoleRequired } from '../middleware/auth';
import * as itemsController from '../controllers/items';

export const itemsRouter = express.Router();

itemsRouter.post('/items', minimumRoleRequired('LIBRARIAN'), itemsController.addItem);

itemsRouter.put('/items/:item_id', minimumRoleRequired('LIBRARIAN'), itemsController.editItem);

itemsRouter.delete('/items/:item_id', minimumRoleRequired('LIBRARIAN'), itemsController.deleteItem);

itemsRouter.get('/items', itemsController.getAllItems);

itemsRouter.get('/items/:item_id', itemsController.getItemFromID);