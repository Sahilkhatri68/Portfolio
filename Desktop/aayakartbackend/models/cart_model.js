const mongoose = require('mongoose');


//Schema for add to cart
const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    },
    product_name: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        imutable: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model('cart', cartSchema);
