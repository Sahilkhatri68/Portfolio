const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    uppercase: true,
  },
  order_by: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  currency: {
    type: String,
    uppercase: true,
  },
  status: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  email: {
    type: String,
  },
  payment_method: {
    type: String,
  },

  product_id: {
    type: String,
  },
  product_name: {
    type: String,
  },
  product_price: {
    type: Number,
  },
  product_quantity: {
    type: Number,
  },
  product_image: {
    type: String,
  },
  address_line_1: {
    type: String,
  },
  address_line_2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = mongoose.model("orders", OrdersSchema);
