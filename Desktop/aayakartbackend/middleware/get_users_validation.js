const Users_Model = require("../models/users_model");
require("dotenv").config();
const JWT = require("jsonwebtoken");

async function get_users_validation(req, res, next) {
  try {
    //Check if user is logged in
    if (req.cookies.token === undefined) {
      return res.status(401).json({
        message: "You are not logged in",
        status: "error",
      });
    }

    //Veryfication Token
    const have_valid_token = JWT.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );

    //Get User id from tocken
    const id_from_token = have_valid_token.id;

    //Get User data from id
    const user = await Users_Model.findById(id_from_token);

    //Check if user is admin
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "You are not authorized to access this page",
        status: "error",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "err.message", status: "error" });
  }
  next();
}

module.exports = get_users_validation;
