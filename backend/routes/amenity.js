import express from 'express';
import { getAllData, createAmenity, deleteAmenity } from '../controllers/amenityController.js';

const router = express.Router();

router.get('/', getAllData);

router.post('/', createAmenity);

router.delete('/:id', deleteAmenity);

export default router;
