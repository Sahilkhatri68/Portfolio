const express = require("express");
const router = express.Router();
const Settings_Model = require("../../models/settings_model");

//Get Template data from settings
router.get("/", async (req, res) => {
  const settings = await Settings_Model.find();
  res.json(settings[0].template);
});

//Pust data in template array
router.post("/:id", async (req, res) => {
  try {
    const settings = await Settings_Model.findById(req.params.id);
    if (!settings) {
      return res
        .status(404)
        .json({ message: "Settings not found", status: "error" });
    }
    settings.template.push({
      title: req.body.title,
      html: req.body.html,
    });
    await settings.save();
    return res
      .status(200)
      .json({ message: "Template Added Successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});


module.exports = router;