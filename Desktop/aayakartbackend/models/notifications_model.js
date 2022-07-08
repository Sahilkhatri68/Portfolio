const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notifications", NotificationsSchema);
