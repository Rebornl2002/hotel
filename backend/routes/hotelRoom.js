import express from 'express';
import {
    getAllData,
    createRoom,
    deleteRoom,
    updateRoom,
    getDataByNameRoom,
} from '../controllers/hotelRoomController.js';

const router = express.Router();

router.get('/', getAllData);

router.get('/:id', getDataByNameRoom);

router.post('/', createRoom);

router.delete('/:id', deleteRoom);

router.put('/:id', updateRoom);

export default router;
