const authController = require('../controllers/authController');
const authValidation = require('../middleware/authValidation')
const express = require('express')
const authRouter = express.Router()


authRouter
    .route('/signup')
    .post(
        authValidation.authValidation,
        authController.SignUp
    )

authRouter
    .route('/login')
    .post(
        authController.Login
    )



module.exports = authRouter
