const db = require('../models/index')
const redis = require('redis')
const util = require('util')
const redisURL = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisURL)

client.get = util.promisify(client.get)


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
        var cartdata = await db.Cart.create({
            userid: req.user.id,
            productid: req.params.productid * 1,
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


exports.getCartUser = async (req, res) => {
    try {

        //If data is available is present in the cached
        const cachedCart = await client.get(req.user.id)
        if (cachedCart) {
            console.log("GETTING DATA FROM THE CACHE")
            return res.status(200).json({
                users: JSON.parse(cachedCart)
            })
        }


        const usercartdata = await db.Cart.findAll(
            {
                where: { userid: req.user.id },
                include: [
                    {
                        model: db.Product,
                        attributes: ['PName', 'price'],
                        include: [
                            {
                                model: db.Category,
                                attributes: ['CategoryName']
                            }
                        ]
                    },
                    {
                        model: db.User,
                        attributes: ['name']
                    }
                ]
            })

        if (usercartdata.length === 0) {
            return res.status(200).json({
                message: "Cart is empty"
            })
        }
        res.status(200).json({
            users: usercartdata
        })
        // If not then set the cached data to thr redis -cached
        console.log("DATA IS SET TO THE REDIS CACHE")
        client.set(req.user.id, JSON.stringify(usercartdata))
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            err: err
        })
    }
}