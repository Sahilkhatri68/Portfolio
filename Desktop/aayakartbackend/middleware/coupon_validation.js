const Coupon_Model = require("../models/coupon_model");

 async function coupon_validation(req, res, next) {
    try {
        const { code, discount, productId, minOrderAmount } = req.body;
        //check all field is filled 
        if (!code || !discount || !productId || !minOrderAmount)
            return(res.status(400).json({ message: "Please enter all required fields.", status: "warning" })) ;
        // if Username already exist
        const check_username = await Coupon_Model.findOne({ code });
        if (check_username)
            return(res.status(400).json({ message: "Coupon is already exists.", status: "warning" }));
        //if discount is more than minOrderAmount
        if (discount > minOrderAmount)
            return(res.status(400).json({ message: "Discount should be less than minOrderAmount.", status: "warning" }));
            
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    next()
}

module.exports = coupon_validation