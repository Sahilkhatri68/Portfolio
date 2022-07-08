const mongoose = require("mongoose");
require("dotenv").config();

//Schema
const users_schema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    imutable: true,
  },
});

module.exports = mongoose.model("users", users_schema);
