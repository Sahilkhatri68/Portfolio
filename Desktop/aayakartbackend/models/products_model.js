const mongoose = require("mongoose");

//all_reviews Schema
const allreviews = new mongoose.Schema({
  comments: String,
  rating: Number,
});

//gallery
const gallery = new mongoose.Schema({
  image: Array,
});

//Schema
const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
  sku: {
    type: String,
  },
  sold_item: {
    type: String,
  },
  variable: {
    type: String,
  },
  tags: {
    type: Array,
    lowercase: true,
  },
  status: {
    type: String,
  },
  featured_image: {
    type: String,
  },
  gallery: {
    type: Array,
  },
  sale_price: {
    type: Number, 
  },
  regular_price: {
    type: Number, 
  },
  stock_status: {
    type: String,
  },
  enable_reviews: {
    type: Boolean,
  },
  avarage_reviews: {
    type: Number,
  },
  all_reviews: allreviews,

  enable_comments: {
    type: Boolean,
  },
  currency: {
    type: String,
  },
  additional_information: {
    type: String,
  },
  isprivate: {
    type: Boolean,
  },
  tax_status: {
    type: String,
  },
  tax_class: {
    type: String,
  },
  publisher: {
    type: String,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("products", ProductsSchema);
