const Category_Model = require('../models/notes_model')
//Middleware for find user
async function note_validation(req, res, next) {
    try {
        const { name, description } = req.body;

        //check all field is filled 
        if (!description || !name)
            return(res.status(400).json({ message: "Please enter all required fields.", status: "info" })) ;

        // if Username already exist
        // const check_username = await Category_Model.findOne({ name });
        // if (check_username)
        //     return(res.status(400).json({ message: "Note is already exists.", status: "warning" }));

    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    next()
}

module.exports = note_validation