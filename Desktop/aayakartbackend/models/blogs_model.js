const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("blogs", BlogsSchema);