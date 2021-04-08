const db = require('../models/index')

exports.productValidation = async (req, res, next) => {

    const { PName, price, Image, CategoryId } = req.body

    if (!PName && !price && !Image && !CategoryId) {
        return res.status(400).json({
            message: "Please Enter all The field"
        })
    }

    const product = await db.Product.findOne({ where: { PName } })
    if (product) {
        return res.status(400).json({
            message: "Product is Already Present"
        })
    }

    next()
}