const express = require("express");
const router = express.Router();
const Register_Model = require("../models/users_model");
// const cookieParser = require("cookie-parser");
// router.use(cookieParser());
require("dotenv").config();
const JWT = require("jsonwebtoken");

//Get Profile data
router.get("http://localhost:4000/api/profile", async (req, res) => {
  try {
    //Check if user have token or not
    if (req.cookies.token) {
      const have_valid_token = JWT.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      const id_from_token = have_valid_token.id;
      const user_data = await Register_Model.findById(id_from_token);
      res.json(user_data);
    } else {
      res.json({ message: "You are not login.", status: "warning" });
    }
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
