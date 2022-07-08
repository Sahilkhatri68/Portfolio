const express = require("express");
const router = express.Router();
const Orders_Model = require("../models/orders_model");
require("dotenv").config();
const JWT = require("jsonwebtoken");
const User_Model = require("../models/users_model");

//Get all orders
router.get("/", (req, res) => {
  Orders_Model.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Count all orders
router.get("/count", (req, res) => {
  Orders_Model.countDocuments()
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Count active orders
router.get("/active", (req, res) => {
  Orders_Model.countDocuments({ status: "active" })
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Count processing orders
router.get("/processing", (req, res) => {
  Orders_Model.countDocuments({ status: "processing" })
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Count completed orders
router.get("/completed", (req, res) => {
  Orders_Model.countDocuments({ status: "completed" })
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Count hold orders
router.get("/hold", (req, res) => {
  Orders_Model.countDocuments({ status: "hold" })
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Count cancelled orders
router.get("/cancelled", (req, res) => {
  Orders_Model.countDocuments({ status: "cancelled" })
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET order by id
router.get("/:id", (req, res) => {
  Orders_Model.findById(req.params.id, (err, order) => {
    if (err) {
      res.send(err);
    } else {
      res.json(order);
    }
  });
});

//Create One
router.post("/", checkToken, async (req, res) => {
  //Generate order id
  const order_id = Math.floor(Math.random() * 1000000);

  //Get user id from token
  const decoded = JWT.verify(req.cookies.token, process.env.JWT_SECRET);
  const user_id = decoded.id;

  //Get fname by user id
  const user = await User_Model.findById(user_id);
  const fname = user.fname;

  const orders = new Orders_Model({
    orderId: order_id,
    order_by: fname,
    currency: req.body.currency,
    status: "active",
    payment_status: "pending",
    phone_number: req.body.phone,
    email: req.body.email,
    payment_method: req.body.payment_method,
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_quantity: req.body.product_quantity,
    product_image: req.body.product_image,
    address_line_1: req.body.address,
    address_line_2: req.body.apartment,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip,
    country: req.body.country,
  });
  try {
    await orders.save();
    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// DELETE order
router.delete("/:id", (req, res) => {
  Orders_Model.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Order deleted successfully" });
    }
  });
});

//Delete multiple orders
router.delete("/", (req, res) => {
  Orders_Model.deleteMany(
    {
      orderId: req.body.ids,
    },
    (err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Orders deleted successfully" });
      }
    }
  );
});

//Update One
router.patch("/:id", (req, res) => {
  Orders_Model.findById(req.params.id, (err, order) => {
    if (err) {
      res.send(err);
    } else {
      order.orderId = req.body.orderId;
      order.order_by = req.body.order_by;
      order.currency = req.body.currency;
      order.status = req.body.status;
      order.phone_number = req.body.phone_number;
      order.email = req.body.email;
      order.payment_method = req.body.payment_method;
      order.product_id = req.body.product_id;
      order.product_name = req.body.product_name;
      order.product_price = req.body.product_price;
      order.product_quantity = req.body.product_quantity;
      order.product_image = req.body.product_image;
      order.address_line_1 = req.body.address_line_1;
      order.address_line_2 = req.body.address_line_2;
      order.city = req.body.city;
      order.state = req.body.state;
      order.zip_code = req.body.zip_code;
      order.country = req.body.country;
      order.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Order updated successfully" });
        }
      });
    }
  });
});

//Update One
router.patch("/:id/status", changeStatus, (req, res) => {
  Orders_Model.findById(req.params.id, (err, order) => {
    if (err) {
      res.send(err);
    } else {
      order.status = req.body.status;
      order.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Order updated successfully" });
        }
      });
    }
  });
});

//Middleware for checking token
async function checkToken(req, res, next) {
  try {
    //Check User logged in or not
    if (!req.cookies.token) {
      return res
        .status(401)
        .json({ message: "Unauthorized! You are not logged in" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
}

//Middle for change status
async function changeStatus(req, res, next) {
  try {
    //Check User logged in or not
    if (!req.cookies.token) {
      return res
        .status(401)
        .json({ message: "Unauthorized! You are not logged in" });
    }

    //Get user id from token
    const decoded = JWT.verify(req.cookies.token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    //Get user role from token
    const user = await User_Model.findById(user_id);
    const role = user.role;

    //Check if user is admin or not
    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized! You are not admin" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  next();
}


module.exports = router;
