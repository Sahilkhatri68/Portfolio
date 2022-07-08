const express = require("express");
const router = express.Router();

//Transaction History model
const TransactionHistory_Model = require("./../models/transaction_history_model");

//Get Transaction History
router.get("/", async (req, res) => {
  const transactionHistory = await TransactionHistory_Model.find();
  res.json(transactionHistory);
});

//Create Transaction History
router.post("/", async (req, res) => {
  try {
    const transactionHistory = new TransactionHistory_Model({
      transaction_id: req.body.transaction_id,
      transaction_type: req.body.transaction_type,
      transaction_amount: req.body.transaction_amount,
      transaction_status: req.body.transaction_status,
      transaction_description: req.body.transaction_description,
      transaction_currency: req.body.transaction_currency,
      transaction_gateway: req.body.transaction_gateway,
      user_id: req.body.user_id,
    });
    await transactionHistory.save();
    res.json({
      message: "Transaction History Added Successfully",
      status: "success",
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: "error",
    });
  }
});

module.exports = router;
