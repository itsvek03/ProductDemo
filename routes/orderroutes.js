const orderController = require('../controllers/orderController')
const authController = require('../controllers/authController')
const express = require('express')
const orderroute = express.Router()


orderroute
    .route('/')
    .post(
        authController.protectTo,
        orderController.addToOrder
    )




module.exports = orderroute


