const express = require("express");
const router = express.Router();
const Notifications_Model = require("./../models/notifications_model");

//Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notifications_Model.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Count unread notifications
router.get("/unread", async (req, res) => {
  try {
    const notifications = await Notifications_Model.find({ status: "unread" });
    res.json(notifications.length);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Create  notification
router.post("/", async (req, res) => {
  const add_notification = new Notifications_Model({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    user: req.body.user,
    status: "unread",
  });
  try {
    const newNotification = await add_notification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Update status
router.patch("/:id", async (req, res) => {
  try {
    const notification = await Notifications_Model.findById(req.params.id);
    if (!notification) {
      return res
        .status(404)
        .json({ message: "Notification not found", status: "error" });
    }
    notification.status = req.body.status;
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete notification
router.delete("/:id", async (req, res) => {
    try {
        const notification = await Notifications_Model.findById(req.params.id);
        if (!notification) {
            return res
                .status(404)
                .json({ message: "Notification not found", status: "error" });
        }
        await notification.remove();    
        res.json({ message: "Notification deleted", status: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
});

module.exports = router;
