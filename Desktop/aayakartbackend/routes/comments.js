const express = require("express");
const router = express.Router();
const Comments_Model = require("../models/comments_model");

//Get All Comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comments_Model.find();
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});
 
//Create One
router.post("/", async (req, res) => {
  const comments = new Comments_Model({
    comment: req.body.comment,
    name: req.body.name,
    email: req.body.email,
    post_id: req.body.post_id,
  });
  try {
    await comments.save();
    res.status(201).json({ message: "Comment successfully added", status: "success" });
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});

//Update One
router.patch("/:id", async (req, res) => {
  try {
    const comments = await Comments_Model.findById(req.params.id);
    comments.comment = req.body.comment;
    comments.name = req.body.name;
    comments.email = req.body.email;
    comments.post_id = req.body.post_id;
    const updatedComments = await comments.save();
    res.json(updatedComments);
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  try {
    const comments = await Comments_Model.findById(req.params.id);
    await comments.remove();
    res.json({ message: "Deleted!", status: "success" });
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});

//Delete All
router.delete("/", async (req, res) => {
  try {
    await Comments_Model.deleteMany();
    res.json({ message: "Deleted!", status: "success" });
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});

//Delete Multiple
router.delete("/multiple", async (req, res) => {
  try {
    await Comments_Model.deleteMany();
    res.json({ message: "Deleted!", status: "success" });
  } catch (error) {
    res.status(400).json({ message: "err.message", status: "error" });
  }
});


module.exports = router;
