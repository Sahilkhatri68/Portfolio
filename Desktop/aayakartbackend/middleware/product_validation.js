const Category_Model = require("../models/category_model");
const Products_Model = require("../models/products_model");
//Middleware for find user
async function product_validation(req, res, next) {
  try {
    const {
      productTitle,
      productDescription,
      productCategory,
      productGallery,
      featuredImage,
      regularPrice,
      salePrice,
      //   stackStatus,
      //   reviews,
      //   comments,
      //   pprivate,
      //   taxStatus,
      tags,
    } = req.body;

    //check all field is filled
    if (
      !productTitle ||
      !productDescription ||
      !productCategory ||
      !productGallery || 
      !featuredImage ||
      !regularPrice ||
      !salePrice ||
      //   !stackStatus ||
      //   !reviews ||
      //   !comments ||
      //   !pprivate ||
      //   !taxStatus ||
      !tags
    )
      return res.status(400).json({
        message: "Please enter all required fields.",
        status: "warning",
      });

    //Check regular price and sale price
    if (regularPrice < salePrice) {
      return res.status(400).json({
        message: "The sale price should be less than the regular price",
        status: "warning",
      });
    }

    //Check slug is unique
    const slug = req.body.slug;
    const slug_exist = await Products_Model.findOne({ slug });
    if (slug_exist) {
      return res.status(400).json({
        message: "The slug is already exist",
        status: "warning",
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
  next();
}

module.exports = product_validation;
