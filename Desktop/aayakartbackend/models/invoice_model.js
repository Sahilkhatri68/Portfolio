const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoice_product_name: {
    type: String,
    required: true,
  },
  invoice_due_date: {
    type: Date,
  },
  invoice_status: {
    type: String,
  },
  invoice_total: {
    type: Number,
    required: true,
  },
  invoice_discount: {
    type: Number,
    required: true,
  },
  invoice_notes: {
    type: String,
    required: true,
  },
  invoice_customer_username: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("Invoice_collection", InvoiceSchema);
