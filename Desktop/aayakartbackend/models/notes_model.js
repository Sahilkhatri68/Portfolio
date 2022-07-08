const mongoose = require("mongoose");

//Schema
const NotesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes_collection", NotesSchema);
