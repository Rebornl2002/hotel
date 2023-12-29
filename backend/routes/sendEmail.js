import express from "express";

const router = express.Router();
import NodeMailer from "nodemailer";
// const emailController = require("../controllers/sendEmailController.js");

//create new ticket
// router.post("/", emailController.sendMail);
router.post("/", (req, res) => {
  //   console.log(req.body);

  const { email, code } = req.body;

  try {
    const transporter = NodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Sending Email With ReactJS and NodeJS",
      html: `<h1> Mã code của bạn là: ${code}.</h1>
      Vui lòng đến trang web: http://192.168.237.1:3000/myFlight để tra cứu chuyến bay của bạn`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Email sent", info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});

export default router;
