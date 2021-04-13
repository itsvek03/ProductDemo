const db = require('../models/index')

exports.addToOrder =(req, res) => {
    try {
        console.log("USER ID OF ORDER", req.user.id)
        //console.log("Bosy",req.body)
        // await db.Orders.create({
        //    location: 'London',
        //    cartid:'{20000}',
        //    status:'Delivered',
        //    userid:11
        // }).then((data) => res.status(200).json({
        //     data:data
        // }))

            const tutorial ={
                location: 'London',
                cartid:'20000',
                status:'Delivered',
                userid:11
            }

        db.Orders.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
        // console.log("Bosy2",orders)
        // return res.status(200).json({
        //     status: "Order Created Successfully",
        //     order: orders
        // })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            err: err
        })
    }
}

 // const usercartdata = await db.Cart.findAll(
        //     {
        //         where: { userid: req.user.id },
        //         include: [
        //             {
        //                 model: db.Product,
        //                 attributes: ['PName', 'price'],
        //                 include: [
        //                     {
        //                         model: db.Category,
        //                         attributes: ['CategoryName']
        //                     }
        //                 ]
        //             },
        //             {
        //                 model: db.User,
        //                 attributes: ['name']
        //             }
        //         ]
        //     })
        //console.log("USERCARTDATA", usercartdata)
        // let orderProducts = usercartdata.map(pd => ({ cartid: pd.id, product: pd.Product.PName, price: pd.Product.price }))
        // console.log("ORDERS PRODUCTS", usercartdata.forE)