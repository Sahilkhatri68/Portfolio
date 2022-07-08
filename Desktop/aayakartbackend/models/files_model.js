const mongoose = require("mongoose");
require("dotenv").config();

//Schema
const filesSchema = new mongoose.Schema({
  location: {
    type: String,
  },
  name: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("files_collection", filesSchema);
