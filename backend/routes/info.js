import express from "express";
import {
  createInfoBooked,
  deleteInfoBooked,
  updateInfoBooked,
  getSingleInfoBooked,
  getAllInfoBooked,
  getInfoBookedBySearch,
} from "./../controllers/infoBookedController.js";

const router = express.Router();

//create new ticket
router.post("/", createInfoBooked);

//delete new ticket
router.delete("/:id", deleteInfoBooked);

//update new ticket
router.put("/:id", updateInfoBooked);

//get single ticket
router.get("/:id", getSingleInfoBooked);

//get all ticket
router.get("/", getAllInfoBooked);

//get all ticket by search
router.get("/search/getInfoBookedBySearch", getInfoBookedBySearch);

export default router;
