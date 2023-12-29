import express from 'express';
import {
    createlogin,
    deletelogin,
    updatelogin,
    getSinglelogin,
    getAllData,
    getloginBySearch,
} from './../controllers/loginController.js';

const router = express.Router();

//create new ticket
router.post('/', createlogin);

//delete new ticket
router.delete('/:id', deletelogin);

//update new ticket
router.put('/:id', updatelogin);

//get single ticket
router.get('/:id', getSinglelogin);

//get all ticket
router.get('/', getAllData);

//get all ticket by search
router.get('/search/getloginBySearch', getloginBySearch);

export default router;
