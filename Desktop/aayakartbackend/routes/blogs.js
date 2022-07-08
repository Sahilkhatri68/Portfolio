const express = require("express");
const router = express.Router();
const Blogs_Model = require("../models/blogs_model");
const Users_Model = require("../models/users_model");

require("dotenv").config();
const JWT = require("jsonwebtoken");

//Create One
router.post("/", post_blog, async (req, res) => {
  const decoded = JWT.verify(req.cookies.token, process.env.JWT_SECRET);
  const blog = new Blogs_Model({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
    publisher: decoded.username,
    category: req.body.category,
  });
  try {
    await blog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get All
router.get("/", async (req, res) => {
  try {
    const blogs = await Blogs_Model.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get One
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blogs_Model.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", status: "error" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Update One
router.patch("/:id", update_blog, async (req, res) => {
  try {
    const blog = await Blogs_Model.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", status: "error" });
    }

    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.content = req.body.content;
    blog.image = req.body.image;
    blog.updatedAt = req.body.updatedAt;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", delete_blog, async (req, res) => {
  try {
    const blog = await Blogs_Model.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", status: "warning" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Middleware for delete blog
async function delete_blog(req, res, next) {
  try {
    const blog = await Blogs_Model.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", status: "warning" });
    }
    res.blog = blog;

    //Check if user is logged in
    if (req.cookies.token === undefined) {
      return res.status(401).json({
        message: "You are not logged in",
        status: "warning",
      });
    }

    //Check if user is the owner of the blog
    const decoded = JWT.verify(req.cookies.token, process.env.JWT_SECRET);
    //Get user role by id
    const user = await Users_Model.findById(decoded.id);

    if (user.role !== "admin") {
      return res.status(401).json({
        message: "You are not authorized to delete this blog",
        status: "warning",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
}

//Middleware for upate blog
async function update_blog(req, res, next) {
  try {
    const blog = await Blogs_Model.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", status: "warning" });
    }
    res.blog = blog;

    //Check if user is logged in
    if (req.cookies.token === undefined) {
      return res.status(401).json({
        message: "You are not logged in",
        status: "warning",
      });
    }

    //Check if user is the owner of the blog
    const decoded = JWT.verify(req.cookies.token, process.env.JWT_SECRET);

    if (decoded.id !== blog.publisher) {
      return res.status(401).json({
        message: "You are not authorized to update this blog",
        status: "warning",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
}

//Middleware for post blog
async function post_blog(req, res, next) {
  try {
    //Check if user is logged in
    if (req.cookies.token === undefined) {
      return res.status(401).json({
        message: "You are not logged in",
        status: "warning",
      });
    }

    //Check if user is the owner of the blog
    const decoded = JWT.verify(req.cookies.token, process.env.JWT_SECRET);
    //Get user role by id
    const user = await Users_Model.findById(decoded.id);

    if (user.role !== "admin") {
      return res.status(401).json({
        message: "You are not authorized to post a blog",
        status: "warning",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
}

module.exports = router;
