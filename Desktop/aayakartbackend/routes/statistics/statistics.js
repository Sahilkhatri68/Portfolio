const express = require("express");
const router = express.Router();

const StatisticsModel = require("./../../models/statistics_model");

//Post One
router.post("/", async (req, res) => {
  const statistics = new StatisticsModel({
    site_visits: [
      {
        date: req.body.date,
        count: req.body.count,
        country: req.body.country,
        device: req.body.device,
        browser: req.body.browser,
        os: req.body.os,
      },
    ],
    date: req.body.date,
  });
  try {
    const newStatistics = await statistics.save();
    res.json(newStatistics);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get All
router.get("/", async (req, res) => {
  try {
    const statistics = await StatisticsModel.find();
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get One
router.get("/:id", async (req, res) => {
  try {
    const statistics = await StatisticsModel.findById(req.params.id);
    if (!statistics) {
      return res
        .status(404)
        .json({ message: "Statistics not found", status: "error" });
    }
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Update One
router.patch("/:id", async (req, res) => {
  try {
    const statistics = await StatisticsModel.findById(req.params.id);

    if (!statistics) {
      return res
        .status(404)
        .json({ message: "Statistics not found", status: "error" });
    }

    statistics.total_orders = req.body.total_orders;
    statistics.total_products = req.body.total_products;
    statistics.total_customers = req.body.total_customers;
    statistics.total_reviews = req.body.total_reviews;
    statistics.total_sales = req.body.total_sales;
    statistics.total_earnings = req.body.total_earnings;
    statistics.total_coupons = req.body.total_coupons;
    statistics.total_refunds = req.body.total_refunds;
    statistics.total_stock = req.body.total_stock;
    statistics.total_low_stock = req.body.total_low_stock;
    statistics.total_out_stock = req.body.total_out_stock;

    const updatedStatistics = await statistics.save();
    res.json(updatedStatistics);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  try {
    const statistics = await StatisticsModel.findById(req.params.id);

    if (!statistics) {
      return res
        .status(404)
        .json({ message: "Statistics not found", status: "error" });
    }

    await statistics.remove();
    res.json({ message: "Statistics deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
