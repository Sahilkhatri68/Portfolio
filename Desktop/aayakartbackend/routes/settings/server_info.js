const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is working");
});

//get Node version
router.get("/node_v", (req, res) => {
  try {
    const nodeVersion = process.versions.node;
    res.json({ nodeVersion });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get dependencies of package.json
router.get("/dependencies", (req, res) => {
  try {
    const dependencies = require("../../package.json");
    res.json(dependencies);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get express version
router.get("/express_v", (req, res) => {
  try {
    //Get Express version
    const expressVersion = require("express/package.json").version;
    res.json({ expressVersion });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
