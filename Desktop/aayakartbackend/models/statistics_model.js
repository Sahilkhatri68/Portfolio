const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  site_visits: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      count: {
        type: Number,
        default: 0,
      },
      country: {
        type: String,
        default: "",
      },
      device: {
        type: String,
        default: "",
      },
      browser: {
        type: String,
        default: "",
      },
      os: {
        type: String,
        default: "",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("statistics", statisticsSchema);
