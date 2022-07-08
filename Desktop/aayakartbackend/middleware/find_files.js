const Files_Models = require("../models/files_model");
//Middleware for find user
async function find_files(req, res, next) {
    let files
    try {
        files = await Files_Models.findById(req.params.id)
        if (files == null) {
            return res.status(400).json({ message: 'Cannot Find User', status: "warning" })
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message, status: "error" })
    }
    res.files = files
    next()
}

module.exports = find_files