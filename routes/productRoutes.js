const productController = require('../controllers/ProductController')
const authController = require('../controllers/authController')
const productValidation = require('../middleware/productValidation')
const express = require("express")
const productroute = express.Router()

productroute
    .route('/')
    .post(
        authController.protectTo,
        authController.restrictTo('Supervisor'),
        productValidation.productValidation,
        productController.createProduct
    )
    .get(productController.getProduct)

productroute
    .route('/:id')
    .get(productController.getProductById)
    .delete(
        authController.protectTo,
        authController.restrictTo('Supervisor'),
        productController.deleteProductById
    )
    .patch(
        authController.protectTo,
        authController.restrictTo('Supervisor'),
        productController.UpdateProductById
    )


module.exports = productroute