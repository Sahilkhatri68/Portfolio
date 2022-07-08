const express = require("express");
const router = express.Router();
const TagsSchema = require("../models/tags_model");

router.get("/", async (req, res) => {
    try {
        const tags = await TagsSchema.find();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
});

//Create new tag
router.post("/", async (req, res) => {
    const tag = new TagsSchema({
        name: req.body.name,
        description: req.body.description,
    });
    try {
        const newTag = await tag.save(); 
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" });
    }
});


//Delete tag
router.delete("/:id", async (req, res) => {
    try {
        const tag = await TagsSchema.findByIdAndDelete(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: "Tag not found", status: "error" });
        }
        res.json({ message: "Tag deleted", status: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
});




module.exports = router;