const mongoose = require("mongoose");

const transactionHistorySchema = new mongoose.Schema({
  transaction_type: {
    type: String,
  },
  transaction_amount: {
    type: Number,
  },
  transaction_status: {
    type: String,
  },
  transaction_description: {
    type: String,
  },
  transaction_gateway: {
    type: String,
  },
  transaction_currency: {
    type: String,
    uppercase: true,
  },
  user_id: {
    type: String,
  },
  transaction_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "transaction_history",
  transactionHistorySchema
);
