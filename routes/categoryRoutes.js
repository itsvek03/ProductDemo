const CategoryController = require('../controllers/CategoryController')
const authController = require('../controllers/authController')
const express = require('express')
const catrouter = express.Router()

catrouter
    .route('/')
    .post(
        // authController.protectTo,
        // authController.restrictTo('Admin'),
        // categoryValidation.categoryValidation,
        CategoryController.createCategory
    )
    .get(CategoryController.GetCategory)

catrouter
    .route('/:id')
    .delete(
        // authController.protectTo,
        // authController.restrictTo('Admin'),
        CategoryController.RemoveCategory
    )
    .get(CategoryController.GetCategoryById)
    .put(
        // authController.protectTo,
        // authController.restrictTo('Admin'),
        // categoryValidation.categoryValidation,
        CategoryController.UpdateCategory
    )


module.exports = catrouter;