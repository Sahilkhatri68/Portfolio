const Register_Models = require("../models/users_model");
//Middleware for Post Validation
async function register_validation(req, res, next) {
  try {
    const { fname, username, phone, password, email } = req.body;

    //check all field is filled
    if (!fname || !username || !phone || !password || !email)
      return res.status(400).json({
        message: "Please enter all required fields.",
        status: "warning",
      });

    // if Username already exist
    const check_username = await Register_Models.findOne({ username });
    if (check_username)
      return res
        .status(400)
        .json({ message: "Username is already exists.", status: "warning" });

    //check username is less then 5 characters
    if (username.length < 5)
      return res.status(400).json({
        message: "Please enter a username of at least 5 characters.",
        status: "warning",
      });

    //check password is less then 6 characters
    if (password.length < 6)
      return res.status(400).json({
        message: "Please enter a password of at least 6 characters.",
        status: "warning",
      });

    // if email already exist
    const check_email = await Register_Models.findOne({ email });
    if (check_email)
      return res
        .status(400)
        .json({ message: "Email is already exists.", status: "warning" });

    // if email already exist
    const check_phone = await Register_Models.findOne({ phone });
    if (check_phone)
      return res.status(400).json({
        message: "Phone number is already exists.",
        status: "warning",
      });

    //check phone number valid or not
    if (phone.length != 10)
      return res.status(400).json({
        message: "Please enter valid phone number.",
        status: "warning",
      });

    //Req Validation
    if (req.body.role == null) {
      req.body.role = "user";
    }
    if (req.body.title == null) {
      req.body.title = "Add title here";
    }
    if (req.body.dob == null) {
      req.body.dob = "09/09/2022";
    }
    if (req.body.dp == null) {
      req.body.dp =
        "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX20548189.jpg";
    }
    if (req.body.lang == null) {
      req.body.lang = "english";
    }
    if (req.body.location == null) {
      req.body.location = "Add you Address";
    }
    if (req.body.country == null) {
      req.body.country = "india";
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = register_validation;
