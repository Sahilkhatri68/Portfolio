const mongoose = require("mongoose");

//Schema
const CategorysSchema = new mongoose.Schema({
  description: {
    type: String,
    lowercase: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("categorys_collection", CategorysSchema);
