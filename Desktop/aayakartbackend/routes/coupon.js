const express = require("express");
const router = express.Router();
const Coupon_Model = require("../models/coupon_model");
const coupon_validation = require("../middleware/coupon_validation");

//Get All
router.get("/", async (req, res) => {
  try {
    const coupon = await Coupon_Model.find();
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Get One
router.get("/:id", async (req, res) => {
  try {
    const coupon = await Coupon_Model.findById(req.params.id);

    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not found", status: "error" });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Create One
router.post("/", coupon_validation, async (req, res) => {
  const coupon = new Coupon_Model({
    code: req.body.code,
    discount: req.body.discount,
    productId: req.body.productId,
    minOrderAmount: req.body.minOrderAmount,
  });
  try {
    const newCoupon = await coupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});

//Update One
router.patch("/:id", async (req, res) => {
  try {
    const coupon = await Coupon_Model.findById(req.params.id);

    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not found", status: "error" });
    }

    coupon.code = req.body.code;
    coupon.discount = req.body.discount;
    coupon.minOrderAmount = "none";
    coupon.maxDiscountAmount = "none";
    coupon.expiryDate = "none";
    coupon.status = "none";
    coupon.createdAt = req.body.createdAt;
    coupon.updatedAt = req.body.updatedAt;

    const updatedCoupon = await coupon.save();
    res.json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

// Delete One
router.delete("/:id", async (req, res) => {
  try {
    const coupon = await Coupon_Model.findById(req.params.id);

    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon not found", status: "error" });
    }

    await coupon.remove();
    res.json({ message: "Coupon deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
