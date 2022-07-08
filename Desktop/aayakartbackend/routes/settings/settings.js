const express = require("express");
const router = express.Router();
const Settings_Model = require("../../models/settings_model");

//Get All Settings
router.get("/", async (req, res) => {
  const settings = await Settings_Model.find();
  res.json(settings);
});

//Create One Settings
router.post("/", async (req, res) => {
  const settings = new Settings_Model({
    general: {
      site_name: req.body.general.site_name,
      site_url: req.body.general.site_url,
      site_email: req.body.general.site_email,
      site_phone: req.body.general.site_phone,
      site_address: req.body.general.site_address,
      site_logo: req.body.general.site_logo,
      site_favicon: req.body.general.site_favicon,
      site_copyright: req.body.general.site_copyright,
      site_description: req.body.general.site_description,
      site_keywords: req.body.general.site_keywords,
      site_author: req.body.general.site_author,
      site_status: req.body.general.site_status,
      site_analytics: req.body.general.site_analytics,
      site_facebook: req.body.general.site_facebook,
      site_twitter: req.body.general.site_twitter,
      site_instagram: req.body.general.site_instagram,
      site_linkedin: req.body.general.site_linkedin,
      site_youtube: req.body.general.site_youtube,
      site_google: req.body.general.site_google,
    },
    smtp: {
      host: req.body.smtp.host,
      port: req.body.smtp.port,
      secure: req.body.smtp.secure,
      user: req.body.smtp.user,
      pass: req.body.smtp.pass,
      from: req.body.smtp.from,
    },
    cors: {
      url: req.body.cors.url,
    },
  });
  try {
    await settings.save();
    return res
      .status(201)
      .json({ message: "Settings created successfully", status: "success" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update One Settings
router.patch("/:id", async (req, res) => {
  try {
    const settings = await Settings_Model.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Id Not Found", status: "error" });
    }
    settings.general.site_name = req.body.general.site_name;
    settings.general.site_url = req.body.general.site_url;
    settings.general.site_email = req.body.general.site_email;
    settings.general.site_phone = req.body.general.site_phone;
    settings.general.site_address = req.body.general.site_address;
    settings.general.site_logo = req.body.general.site_logo;
    settings.general.site_favicon = req.body.general.site_favicon;
    settings.general.site_copyright = req.body.general.site_copyright;
    settings.general.site_description = req.body.general.site_description;
    settings.general.site_keywords = req.body.general.site_keywords;
    settings.general.site_author = req.body.general.site_author;
    settings.general.site_status = req.body.general.site_status;
    settings.general.site_analytics = req.body.general.site_analytics;
    settings.general.site_facebook = req.body.general.site_facebook;
    settings.general.site_twitter = req.body.general.site_twitter;
    settings.general.site_instagram = req.body.general.site_instagram;
    settings.general.site_linkedin = req.body.general.site_linkedin;
    settings.general.site_youtube = req.body.general.site_youtube;
    settings.general.site_google = req.body.general.site_google;
    settings.smtp.host = req.body.smtp.host;
    settings.smtp.port = req.body.smtp.port;
    settings.smtp.secure = req.body.smtp.secure;
    settings.smtp.user = req.body.smtp.user;
    settings.smtp.pass = req.body.smtp.pass;
    settings.smtp.from = req.body.smtp.from;
    settings.cors.url = req.body.cors.url;
    await settings.save();
    return res
      .status(200)
      .json({ message: "Settings Updated Successfully", status: "success" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete One Settings
router.delete("/:id", async (req, res) => {
  try {
    const settings = await Settings_Model.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Id Not Found", status: "error" });
    }
    await settings.remove();
    res.json({ message: "Settings Deleted", status: "success" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Get One Settings
router.get("/:id", async (req, res) => {
  try {
    const settings = await Settings_Model.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Id Not Found", status: "error" });
    }
    res.json(settings);
  } catch (err) {
    res.json({ message: err });
  }
});

//Updae SMTP array by id
router.patch("/smtp/:id", async (req, res) => {
  try {
    const settings = await Settings_Model.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Id Not Found", status: "error" });
    }

    const smtp = {
      host: req.body.smtp.host,
      port: req.body.smtp.port,
      secure: req.body.smtp.secure,
      user: req.body.smtp.user,
      pass: req.body.smtp.pass,
      from: req.body.smtp.from,
    };
    settings.smtp = smtp;
    await settings.save();
    return res.status(200).json({ message: "SMTP Updated", status: "success" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Post SMTP Settings
router.post("/smtp/:id", async (req, res) => {
  try {
    const settings = await Settings_Model.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Id Not Found", status: "error" });
    }
    settings.smtp.host = req.body.smtp.host;
    settings.smtp.port = req.body.smtp.port;
    settings.smtp.secure = req.body.smtp.secure;
    settings.smtp.user = req.body.smtp.user;
    settings.smtp.pass = req.body.smtp.pass;
    settings.smtp.from = req.body.smtp.from;
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get SMTP Settings
router.get("/smtp/:id", async (req, res) => {
  try {
    const settings = await Settings_Model.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Id Not Found", status: "error" });
    }
    res.json(settings.smtp);
  } catch (err) {
    res.json({ message: err });
  }
});

//Create new Document
// router.post("/documents", async (req, res) => {
//   try {
//     const settings = await Settings_Model.findById(req.params.id);
//     if (!settings) {
//       return res.status(404).json({ message: "Id Not Found", status: "error" });
//     }
//     const document = new Document_Model({
//       title: req.body.title,
//       description: req.body.description,
//       file: req.body.file,
//     });
//     await document.save();
//     settings.documents.push(document);
//     await settings.save();
//     res.json(document);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// //Create new Array of Documents
// router.post("/documents/:id", async (req, res) => {
//   try {
//     const settings = await Settings_Model.findById(req.params.id);
//     if (!settings) {
//       return res.status(404).json({ message: "Id Not Found", status: "error" });
//     }
//     const documents = req.body.documents;
//     for (let i = 0; i < documents.length; i++) {
//       const document = new Document_Model({
//         title: documents[i].title,
//         description: documents[i].description,
//         file: documents[i].file,
//       });

//       await document.save();
//       settings.documents.push(document);
//     }
//     await settings.save();
//     res.json(settings);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });


module.exports = router;
