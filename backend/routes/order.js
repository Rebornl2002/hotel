import express from 'express';
import { getAllData, createOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllData);

router.post('/', createOrder);

router.delete('/:id', deleteOrder);

export default router;
