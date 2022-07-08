const express = require("express");
const router = express.Router();

const Settings_Model = require("../../models/settings_model");

//Get cors array data from settings
router.get("/", async (req, res) => {
  const settings = await Settings_Model.find();
  res.json(settings[0].cors);
});

//Push data in message array
router.post("/:id", checkIfUrlExists, async (req, res) => {
  try {
    const support = await Settings_Model.findById(req.params.id);
    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    //generate crypto random string
    const crypto = require("crypto");
    const randomString = crypto.randomBytes(20).toString("hex");

    support.cors.push({
      url: req.body.url,
      access_key: randomString,
    });
    await support.save();
    return res
      .status(200)
      .json({ message: "CORS Added Successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One cors array by id
router.delete("/:id/:url", async (req, res) => {
  try {
    const support = await Settings_Model.findById(req.params.id);
    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    support.cors.id(req.params.url).remove();
    await support.save();
    return res
      .status(200)
      .json({ message: "CORS Deleted Successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Middleware to check if url is already in cors array
async function checkIfUrlExists(req, res, next) {
  try {
    //Get Url from cors array
    const url = req.body.url;
    const support = await Settings_Model.findById(req.params.id);
    if (!support) {
      return res
        .status(404)
        .json({ message: "Support not found", status: "error" });
    }
    //Check if url is already in cors array
    const cors = support.cors.find((cors) => cors.url === url);
    if (cors) {
      return res
        .status(400)
        .json({ message: "Url already exists", status: "error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
  next();
}

module.exports = router;
