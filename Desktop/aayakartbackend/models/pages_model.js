const mongoose = require("mongoose");

const PagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("pages", PagesSchema);