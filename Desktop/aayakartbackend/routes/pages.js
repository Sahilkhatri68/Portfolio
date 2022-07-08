const express = require("express");
const router = express.Router();
const PagesSchema = require("../models/pages_model");

//Get all pages
router.get("/", async (req, res) => {
  try {
    const pages = await PagesSchema.find();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
}); 

//Get page by slug
router.get("/:slug", async (req, res) => {
  try {
    const page = await PagesSchema.findOne({ slug: req.params.slug });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});


//Create new page
router.post("/", async (req, res) => {
  const page = new PagesSchema({
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    content: req.body.content,
    published: false,
  });
  try {
    const newPage = await page.save();
    res.status(201).json(newPage);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
  }
});

//Update page
// router.patch("/:id", async (req, res) => {
//     try {
//         const page = await PagesSchema.findById(req.params.id);
//         if (!page) {
//             return res.status(404).json({ message: "Page not found", status: "error" });
//         }
//         page.name = req.body.name;
//         page.slug = req.body.slug;
//         page.description = req.body.description;
//         page.content = req.body.content;
//         const updatedPage = await page.save();
//         res.json(updatedPage);
//     } catch (error) {
//         res.status(500).json({ message: error.message, status: "error" });
//     }
// });

//Update Published

router.patch("/published/:id", async (req, res) => {
  try {
    const page = await PagesSchema.findById(req.params.id);
    if (!page) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    page.published = req.body.published;
    const updatedPage = await page.save();
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete page
router.delete("/:id", async (req, res) => {
  try {
    const page = await PagesSchema.findByIdAndDelete(req.params.id);
    if (!page) {
      return res
        .status(404)
        .json({ message: "Page not found", status: "error" });
    }
    res.json({ message: "Page deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
