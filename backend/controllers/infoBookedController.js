import InfoBooked from "../models/infoBooked.js";
import moment from "moment";

//Create infoBooked

export const createInfoBooked = async (req, res) => {
  const newInfoBooked = new InfoBooked(req.body);
  console.log("vai ca chu bin");
  try {
    const saveInfoBooked = await newInfoBooked.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: saveInfoBooked,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again ",
    });
  }
};

//update ticket

export const updateInfoBooked = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedInfoBooked = await InfoBooked.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedInfoBooked,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again ",
    });
  }
};

//delete ticket

export const deleteInfoBooked = async (req, res) => {
  const id = req.params.id;
  try {
    await InfoBooked.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again ",
    });
  }
};

//getSingle ticket

export const getSingleInfoBooked = async (req, res) => {
  const id = req.params.id;
  try {
    const infoBooked = await InfoBooked.findById(id);

    res.status(200).json({
      success: true,
      message: "Successfully",
      data: infoBooked,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found ",
    });
  }
};

//getAll ticket

export const getAllInfoBooked = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);
  console.log(page);

  console.log("vai ca cut");

  try {
    const infoBooked = await InfoBooked.find({})
      .skip(page * 5)
      .limit(5);

    if (infoBooked.length > 0) {
      console.log("ao that day");
      res.status(200).json({
        success: true,
        count: infoBooked.length,
        message: "Successfully",
        data: infoBooked,
      });
    } else {
      throw new Error("No tickets found"); // Throw an error when tickets.length is <= 0
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found ",
    });
  }
};

//get ticket by search
export const getInfoBookedBySearch = async (req, res) => {
  //here 'i' means case sensitive

  // const codeTicket = new RegExp(req.query.CodeTicket);
  // const CodeTicket = new RegExp(req.query);

  const codeTicket = new RegExp(`^${req.query.CodeTicket}$`);

  console.log("in codeTicket cho t", codeTicket);

  try {
    const InfoBookeds = await InfoBooked.find({
      // CodeTicket: { $eq: CodeTicket },
      CodeTicket: codeTicket,
    });

    res.status(200).json({
      success: true,
      message: "Successfully found search",
      count: InfoBookeds.length,
      data: InfoBookeds,
    });

    console.log(InfoBookeds);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found booked",
    });
  }
};
