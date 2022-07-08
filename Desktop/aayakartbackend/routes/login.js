const express = require("express");
const router = express.Router();
const Users_Models = require("../models/users_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const bcrypt = require("bcryptjs");

//User Login
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users_Models.findOne({ username }).lean();
    if (!user)
      return res
        .status(400)
        .json({ message: "User and password is wrong.", status: "warning" });
    const hashpass = user.password;
    if (!bcrypt.compareSync(password, hashpass))
      return res
        .status(400)
        .json({ message: "User and password is wrong.", status: "warning" });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    //Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    }); //30 days

    //Set LocalStorage
    res.locals.user = {
      id: user._id,
      username: user.username,
    };

    res.status(200).json({ message: "Login Successful", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Check User is login or not
router.get("/check_have_token", (req, res) => {
  try {
    const have_valid_tokem = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    //Get User id from tocken
    const id_from_token = have_valid_tokem.id;
    //Check Same id have database
    const user_id = Users_Models.findById(id_from_token);
    if (user_id == undefined) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

//Check have valid token
// router.get("/check_valid_token", (req, res) => {
//   try {
//     const have_valid_tokem = jwt.verify(
//       req.cookies.token,
//       process.env.JWT_SECRET
//     );
//     res.json(true);
//   } catch (error) {
//     res.json(false);
//   }
// });

//Check token id is same with user id
router.get("/check_token_id_is_same_with_user_id", (req, res) => {
  try {
    const have_valid_tokem = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    //Get User id from tocken
    const id_from_token = have_valid_tokem.id;
    //Check Same id have database
    const user_id = Users_Models.findById(id_from_token);
    if (user_id == undefined) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

//Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout Success!", status: "success" });
});

module.exports = router;
