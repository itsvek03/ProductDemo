const db = require('../models/index')

exports.addToOrder = async (req, res) => {
    try {
        console.log("USER ID OF ORDER", req.user.id)


        const usercartdata = await db.Cart.findAll(
            {
                where: { userid: req.user.id },
                // include: [
                //     {
                //         model: db.Product,
                //         attributes: ['PName', 'price'],
                //         include: [
                //             {
                //                 model: db.Category,
                //                 attributes: ['CategoryName']
                //             }
                //         ]
                //     },
                //     {
                //         model: db.User,
                //         attributes: ['name']
                //     }
                // ]
            })

        let orderProducts = usercartdata.map(pd => ({ cartid: pd.id }))
        console.log("ORDERS PRODUCTS", orderProducts)

        // console.log("REQ BODY", req.body)

        db.Orders.create({
            location: req.body.location,
            userid: req.user.id,
            status: req.body.status,
            cartid: req.body.cartid
        }).then((data) => {
            return res.status(200).json({ data: data })
        }).catch((err) => { return res.status(400).json({ err: err }) })


        // return res.status(200).json({
        //     status: "Order Created Successfully",
        //     order: order
        // })

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            err: err
        })
    }
}