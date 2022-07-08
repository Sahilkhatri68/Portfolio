const express = require("express");
const router = express.Router();
const Users_Schema = require("./../models/users_model");
const bcryptjs = require("bcryptjs");

//Create user
router.post("/", validateRegister, async (req, res) => {
  console.log(req.body)
  //Hash the password
  const salt = await bcryptjs.genSalt();
  const hashed_password = await bcryptjs.hash(req.body.password, salt);

  const user = new Users_Schema({
    fname: req.body.fullName,
    username: req.body.username,
    title: "add your title",
    phone: req.body.phone_number,
    dob: "add your date of birth",
    country: "add your country",
    password: hashed_password,
    location: "location",
    dp: "https://dpwhatsapp.xyz/wp-content/uploads/2021/05/Anonymous-WhatsApp-DP.jpg",
    email: req.body.email,
    lang: "english",
    role: "user",
  });
  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});
 
//Middleware for register validation 
async function validateRegister(req, res, next) {
  //Check password and confirm password match
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({
      message: "Password and confirm password do not match",
      status: "error",
    });

  //Check if user exists
  const user = await Users_Schema.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({
      message: "User already exists",
      status: "error",
    });

  //Check Phone Number is valid
  if (req.body.phone_number) {
    const phone_number = req.body.phone_number;
    const phone_number_regex = /^[0-9]{10}$/;
    if (!phone_number_regex.test(phone_number))
      return res.status(400).json({
        message: "Phone Number is not valid",
        status: "error",
      });
  }

  //Check email is valid
  const email = req.body.email;
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email_regex.test(email))
    return res.status(400).json({
      message: "Email is not valid",
      status: "error",
    });

  //Check username is valid
  const username = req.body.username;
  const username_regex = /^[a-zA-Z0-9]{3,20}$/;
  if (!username_regex.test(username))
    return res.status(400).json({
      message: "Username is not valid",
      status: "error",
    });

  next(); 
}

module.exports = router; 
