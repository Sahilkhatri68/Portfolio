const express = require("express");
const router = express.Router();
const Category_Model = require("../models/category_model");
const find_category = require("../middleware/find_category");
const Products_Model = require("../models/products_model");
const Users_Model = require("../models/users_model");
require("dotenv").config();
const JWT = require("jsonwebtoken");

//Create Category
router.post("/", post_category, async (req, res) => {
  const new_category = new Category_Model({
    description: req.body.description,
    name: req.body.name,
  });
  try {
    await new_category.save();
    res
      .status(201)
      .json({ message: "Category successfully created", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Get All Category
router.get("/", async (req, res) => {
  try {
    const Category = await Category_Model.find();
    res.json(Category);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Getting One
router.get("/:id", find_category, (req, res) => {
  try {
    res.json(res.category.name);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", delete_category, find_category, async (req, res) => {
  try {
    await res.category.remove();
    res.json({ message: "Deleted Category" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Update One
router.patch("/:id", update_category, async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }
  if (req.body.description != null) {
    res.category.description = req.body.description;
  }
  try {
    const updateCategory = await res.category.save();
    res.json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//middleware for post category
async function post_category(req, res, next) {
  try {
    const { name, description } = req.body;

    //check all field is filled
    if (!description || !name)
      return res.status(400).json({
        message: "Please enter all required fields.",
        status: "warning",
      });

    // if Category already exist
    const check_category = await Category_Model.findOne({ name });
    if (check_category)
      return res
        .status(400)
        .json({ message: "Category is already exists.", status: "warning" });

    //Check if user is logged in
    if (req.cookies.token === undefined) {
      return res.status(401).json({
        message: "You are not logged in",
        status: "error",
      });
    }

    //Check if have token and if user is admin
    const token = req.cookies.token;
    const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
    const username = have_valid_token.username;
    const user = await Users_Model.findOne({ username: username });
    if (user.role != "admin") {
      return res.status(401).json({
        message: "You are not authorized to add category",
        status: "warning",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
  next();
}

//middleware for delete category
async function delete_category(req, res, next) {
  try {
    const category = await Category_Model.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.category = category;

    //Check if user is logged in
    if (req.cookies.token === undefined) {
      return res.status(401).json({
        message: "You are not logged in",
        status: "warning",
      });
    }

    //Check if category is used in any product
    const products = await Products_Model.find({ category: req.params.id });
    if (products.length > 0) {
      return res.status(400).json({ message: "Category is used in products" });
    }

    //Check if have token and if user is admin
    const token = req.cookies.token;
    const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
    const username = have_valid_token.username;
    const user = await Users_Model.findOne({ username: username });
    if (user.role != "admin") {
      return res.status(401).json({
        message: "You don't have permission to delete the category",
        status: "warning",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
}

//middleware for update category
async function update_category(req, res, next) {
  try {
    const category = await Category_Model.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.category = category;

    //Check if user is logged in
    if (req.cookies.token === undefined) {
      return res.status(401).json({
        message: "You are not logged in",
        status: "error",
      });
    }

    //Check if have token and if user is admin
    const token = req.cookies.token;
    const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
    const username = have_valid_token.username;
    const user = await Users_Model.findOne({ username: username });
    if (user.role != "admin") {
      return res.status(401).json({
        message: "You don't have permission to update the category",
        status: "warning",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
}

module.exports = router;
