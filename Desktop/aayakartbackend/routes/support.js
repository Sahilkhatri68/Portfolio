const express = require("express");
const router = express.Router();
const Support_Model = require("../models/support_model");
//Get Users Models
const User_Model = require("../models/users_model");
require("dotenv").config();

const JWT = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

//Get All
router.get("/", async (req, res) => {
  try {
    const support = await Support_Model.find();
    res.json(support);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get One
router.get("/:id", async (req, res) => {
  try {
    const support = await Support_Model.findById(req.params.id);

    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    res.json(support);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Create One
router.post("/", async (req, res) => {
  //Get Token from cookie
  const token = req.cookies.token;

  //Get User id from tocken
  const have_valid_tokem = JWT.verify(token, process.env.JWT_SECRET);
  const id_from_token = have_valid_tokem.id;

  //Get User from id
  const user = await User_Model.findById(id_from_token);

  console.log(user.fname);

  const support = new Support_Model({
    name: user.fname,
    email: user.email,
    title: req.body.title,
    message: req.body.message,
    status: req.body.status,
  });
  try {
    const newSupport = await support.save();
    res.status(201).json(newSupport);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Push data in message array
router.post("/:id/message", async (req, res) => {
  //Get Token from cookie
  const token = req.cookies.token;

  //Get User id from tocken
  const have_valid_tokem = JWT.verify(token, process.env.JWT_SECRET);
  const id_from_token = have_valid_tokem.id;

  //Get fname by id
  const get_fname = await User_Model.findById(id_from_token);
  const fname = get_fname.fname;

  try {
    const support = await Support_Model.findById(req.params.id);
    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    support.message.push({
      message: req.body.message,
      message_by: fname,
    });
    await support.save();
    return res
      .status(200)
      .json({ message: "Message added successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete data from message array
router.delete("/:id/message/:messageId", async (req, res) => {
  try {
    const support = await Support_Model.findById(req.params.id);
    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    support.message.id(req.params.messageId).remove();
    await support.save();
    res.json(support);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Update data from message array
router.patch("/:id/message/:messageId", async (req, res) => {
  try {
    const support = await Support_Model.findById(req.params.id);
    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    support.message.id(req.params.messageId).remove();
    support.message.push({
      description: req.body.description,
      status: req.body.status,
      createdAt: req.body.createdAt,
    });
    await support.save();
    res.json(support);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Update One
router.patch("/:id", async (req, res) => {
  try {
    const support = await Support_Model.findById(req.params.id);

    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    support.title = req.body.title;
    support.description = req.body.description;
    support.status = req.body.status;
    support.createdAt = req.body.createdAt;
    support.updatedAt = req.body.updatedAt;
    const updatedSupport = await support.save();
    res.json(updatedSupport);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  try {
    const support = await Support_Model.findById(req.params.id);
    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    await support.remove();
    res.json({ message: "Deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete All
router.delete("/", async (req, res) => {
  try {
    await Support_Model.deleteMany();
    res.json({ message: "Deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
