const db = require('../models/index')


exports.createCart = async (req, res) => {
    try {
        if (!req.body.user) {
            req.body.user = req.user.id
        }

        if (req.body.quantity === 0) {
            return res.status(400).json({
                message: "Cart Cannot be empty"
            })
        }
        console.log("Quantity", req.body.quantity)
        console.log("USer Body", req.user.id)
        console.log("Product Id", req.params.productid)

        var cartdata = await db.Cart.create({
            userid: req.user.id,
            productid: req.params.productid,
            quantity: req.body.quantity,
        })

        console.log("Data", cartdata)
        return res.status(200).json({
            status: "Cart Added Successfully",
            cartdata
        })
    }
    catch (err) {
        res.status(500).json({
            status: "Something went wrong",
            err: err
        })
    }
}