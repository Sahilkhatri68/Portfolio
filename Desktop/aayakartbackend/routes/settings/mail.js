const express = require("express");
const router = express.Router();
const Settings_Model = require("../../models/settings_model");
const nodemailer = require("nodemailer");

//Post request for sending mail
router.post("/", async (req, res) => {
  try {
    const settings = await Settings_Model.find();
    //get SMTP settings from settings
    const smtp = settings[0].smtp[0];

    //Create a transporter
    const transporter = nodemailer.createTransport({
      host: smtp.host, //Host
      port: smtp.port, //Port
      secure: smtp.secure, // true for 465, false for other ports
      auth: {
        user: smtp.user, // generated ethereal user
        pass: smtp.pass, // generated ethereal password
      }
    });

    //Send mail
    let info = await transporter.sendMail({
      from: smtp.from, // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.text, // plain text body
      html: req.body.html, // html body
    });
    res.status(200).json({
      message: "Mail sent successfully",
      status: "success",
      info: `Message Id ${info.messageId}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
