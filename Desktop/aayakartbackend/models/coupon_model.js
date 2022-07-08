const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    minOrderAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("coupon_collection", CouponSchema);
