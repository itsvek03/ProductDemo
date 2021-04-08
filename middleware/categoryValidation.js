const db = require('../models/index')

exports.categoryValidation = async (req, res, next) => {

    const { CategoryName } = req.body
    if (!CategoryName) {
        return res.status(400).json({
            message: "Please Enter the Category Name"
        })
    }
    const category = await db.Category.findOne({ where: { CategoryName } })
    if (category) {
        return res.status(400).json({
            message: "Category Name is Already Present"
        })
    }
    next()
}