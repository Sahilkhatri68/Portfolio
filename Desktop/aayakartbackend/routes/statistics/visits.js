const express = require("express");
const router = express.Router();
const Statistics_Model = require("./../../models/statistics_model");

//Get all Visits Statistics
router.get("/", async (req, res) => {
  try {
    const statistics = await Statistics_Model.find();
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Push data in visits array of statistics
router.post("/:id", async (req, res) => {
  const { date, count, country, device, browser, os } = req.body;
  try {
    const statistics = await Statistics_Model.findById(req.params.id);
    if (!statistics) {
      return res
        .status(404)
        .json({ message: "Statistics not found", status: "error" });
    }
    statistics.site_visits.push({
      date,
      count,
      country,
      device,
      browser,
      os,
    });
    await statistics.save();
    res.json({ message: "Statistics updated", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});


module.exports = router;
