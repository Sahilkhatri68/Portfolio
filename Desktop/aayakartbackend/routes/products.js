const express = require("express");
const router = express.Router();
const Products_Model = require("../models/products_model");
const product_validation = require("../middleware/product_validation");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Getting All Only For test
router.get("/", async (req, res) => {
  try {
    const user = await Products_Model.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Count all products
router.get("/count", async (req, res) => {
  try {
    const user = await Products_Model.countDocuments();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Get One
router.get("/:id", async (req, res) => {
  try {
    const product = await Products_Model.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get One By Slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await Products_Model.findOne({ slug: req.params.slug });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get One By Category
router.get("/category/:category", async (req, res) => {
  try {
    const product = await Products_Model.find({
      category: req.params.category,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Create Search API
router.get("/search/:name", async (req, res) => {
  const search = req.params.name;
  console.log(search);
  try {
    const product = await Products_Model.find({
      "$or": [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ],
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "error.message", status: "error" });
  }
});



//Post One
router.post("/", product_validation, async (req, res) => {
  //Generate Random SKU
  const sku = Math.floor(Math.random() * 1000000);

  //Get Username
  const token = req.cookies.token;
  const have_valid_token = jwt.verify(token, process.env.JWT_SECRET);
  const username = have_valid_token.username;

  const add_product = new Products_Model({
    title: req.body.productTitle,
    slug: req.body.slug,
    description: req.body.productDescription,
    category: req.body.productCategory,
    sku: sku,
    sold_item: 0,
    status: "active",
    all_reviews: {
      comments: "This is amazing product i like that",
      rating: 4.5,
    },
    gallery: req.body.productGallery,
    featured_image: req.body.featuredImage,
    regular_price: req.body.regularPrice,
    sale_price: req.body.salePrice,
    stock_status: req.body.stackStatus,
    enable_reviews: req.body.reviews,
    enable_comments: req.body.comments,
    currency: "INR",
    isprivate: req.body.isprivate,
    tax_status: req.body.taxStatus,
    tax_class: req.body.taxClass,
    tags: req.body.tags,
    ratings: "req.body.ratings",
    publisher: username,
  });
  try {
    const newProduct = await add_product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Push Review
router.patch("/:id/reviews", async (req, res) => {
  try {
    const product = await Products_Model.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", status: "error" });
    }
    product.all_reviews.comments = req.body.comments;
    product.all_reviews.rating = req.body.rating;
    const updated_product = await product.save();
    res.json(updated_product);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await Products_Model.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Product" });
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
