const express = require("express");
const router = express.Router();
const Cart_Model = require("../models/cart_model");
require("dotenv").config();
const JWT = require("jsonwebtoken");
const Products_Model = require("../models/products_model");

//Get all
router.get("/all", async (req, res) => {
  try {
    const cart = await Cart_Model.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Count Cart
router.get("/count", async (req, res) => {
  try {
    //Get User id from tocken
    const have_valid_tokem = JWT.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    const user_id = have_valid_tokem.id;

    const cart = await Cart_Model.find({ user_id: user_id });
    // console.log(cart.length);
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", status: "error" });
    }

    res.json(cart.length);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get One
router.get("http://localhost:4000/api/cart/:_id", async (req, res) => {
  try {
    const cart = await Cart_Model.findById(req.params.id);

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", status: "error" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get Cart By User
router.get("/", async (req, res) => {
  try {
    //Get User id from tocken
    const have_valid_tokem = JWT.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    const user_id = have_valid_tokem.id;

    const cart = await Cart_Model.find({ user_id: user_id });
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", status: "error" });
    }

    res.send(
      cart.map((cart) => {
        return {
          id: cart._id,
          user_id: cart.user_id,
          product_id: cart.product_id,
          quantity: cart.quantity,
          price: cart.price,
          total: cart.total,
          product_name: cart.product_name,
          product_image: cart.product_image,
        };
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Create One
router.post(
  "http://localhost:4000/api/cart",
  validate_token,
  async (req, res) => {
    //Get Token from cookie
    const token = req.cookies.token;
    //Get User id from tocken
    const have_valid_tokem = JWT.verify(token, process.env.JWT_SECRET);
    const user_id = have_valid_tokem.id;
    const cart = new Cart_Model({
      user_id: user_id,
      product_id: req.body.product_id,
      quantity: 1,
      price: req.body.price,
      product_name: req.body.title,
      product_image: req.body.featured_image,
    });
    try {
      await cart.save();
      res.status(201).json({ message: "Cart created => ", status: "success" });
    } catch (error) {
      res.status(400).json({ message: error.message, status: "error" });
    }
  }
);

//Remove One
router.delete("http://localhost:4000/api/cart/:id", async (req, res) => {
  try {
    const cart = await Cart_Model.findByIdAnd;
    Delete(req.params.id);
    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", status: "error" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Middleware for check token
async function validate_token(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    //Return error
    res.status(500).json({ message: error.message, status: "error" });
  }
}

module.exports = router;
