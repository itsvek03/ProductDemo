const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const express = require('express')
const userroutes = express.Router()

userroutes
    .route('/getMe')
    .get(
        authController.protectTo,
        userController.getMe
    )




module.exports = userroutes