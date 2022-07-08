const express = require("express");
const router = express.Router();
const Register_Model = require("../models/register_model");
const bcrypt = require("bcryptjs");
const register_validation = require("../middleware/register_validation"); 

// Getting All Only For test
router.get("/", async (req, res) => {
  try {
    const user = await Register_Model.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "error.message", status: "error" });
  }
});

//Post One
router.post("/",register_validation, async (req, res) => {
  //Hash the password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(req.body.password, salt);

  const add_users = new Register_Model({
    title: req.body.fname,
    username: req.body.username,
    title: req.body.title,
    phone: req.body.phone,
    dob: req.body.dob,
    country: req.body.country,
    password: passwordHash,
    location: req.body.location,
    dp: req.body.dp,
    email: req.body.email,
    lang: req.body.lang,
    role: req.body.role
  });
  try {
    const newUser = await add_users.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
