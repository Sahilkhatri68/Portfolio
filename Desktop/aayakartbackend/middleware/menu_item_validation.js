const MenuItem_Model = require("../models/menu_item_model");

//Check if the menu item is already exist
async function check_menu_item_exist(req, res, next) {
    //Check all field is filled
    if (!req.body.name || !req.body.url || !req.body.icon)
        return res.status(400).json({ Message: "Please enter all required fields." });

    //Check if the menu item is already exist
    const menuItem = await MenuItem_Model.findOne({ name: req.body.name });
    if (menuItem)
        return res.status(400).json({ Message: "MenuItem already exist." });

    next();
}

module.exports = check_menu_item_exist;
