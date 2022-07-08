const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  sub_menu: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("menu_item_collection", menuItemSchema);
