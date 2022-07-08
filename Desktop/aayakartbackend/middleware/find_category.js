const Category_Model = require('../models/category_model')
//Middleware for find user
async function find_category(req, res, next) {
    let category
    try {
        category = await Category_Model.findById(req.params.id)
        if (category == null) {
            return res.status(400).json({ message: 'Cannot Find User' })
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error" })
    }
    res.category = category
    next()
}

module.exports = find_category