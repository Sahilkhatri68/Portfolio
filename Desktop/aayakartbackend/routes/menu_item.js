const express = require("express");
const router = express.Router();
const MenuItem_Model = require("../models/menu_item_model");
const menu_item_validation = require("../middleware/menu_item_validation");

//Create One
router.post("/", menu_item_validation, async (req, res) => {
  const menuItem = new MenuItem_Model({
    name: req.body.name,
    url: req.body.url,
    icon: req.body.icon,
    sub_menu: req.body.sub_menu,
  });

  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});

//Get All
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem_Model.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Get One
router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem_Model.findById(req.params.id);

    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "MenuItem not found", status: "error" });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Update One
router.patch("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem_Model.findById(req.params.id);

    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "MenuItem not found", status: "error" });
    }

    menuItem.name = req.body.name;
    menuItem.url = req.body.url;
    menuItem.icon = req.body.icon;
    menuItem.sub_menu = req.body.sub_menu;

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem_Model.findById(req.params.id);

    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "MenuItem not found", status: "error" });
    }

    await menuItem.remove();
    res.json({ message: "Deleted successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Push data to sub_menu
router.patch("/:id/sub_menu", async (req, res) => {
  try {
    const menuItem = await MenuItem_Model.findById(req.params.id);

    if (!menuItem) {
      return res
        .status(404)
        .json({ message: "MenuItem not found", status: "error" });
    }

    menuItem.sub_menu.push(req.body);

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
