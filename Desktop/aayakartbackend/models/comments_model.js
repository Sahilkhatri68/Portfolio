const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("comments_collection", CommentsSchema);