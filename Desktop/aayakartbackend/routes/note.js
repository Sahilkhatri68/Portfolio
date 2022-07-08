const express = require("express");
const router = express.Router();
const Notes_Model = require("../models/notes_model");
const note_validation = require("../middleware/note_validation");

// Getting All Only For test
router.get("/", async (req, res) => {
  try {
    const user = await Notes_Model.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

//Post One
router.post("/", note_validation, async (req, res) => {
  const add_note = new Notes_Model({
    name: req.body.name,
    description: req.body.description,
    role: req.body.role,
  });
  try {
    const newNote = await add_note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: err.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  try {
    await Notes_Model.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Note" });
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

module.exports = router;
