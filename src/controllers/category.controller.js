const mongoose = require('mongoose');
const asyncHandler = require('../middleware/async.mw');
const ErrorResponse = require('../utils/errorResponse.util');

// model
const Category = require('../models/Category.model');

//  @desc   Get all categories
//  @route  GET /api/v1/category
//  @access Public
exports.getCategories = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//  @desc   Get a single category
//  @route  GET /api/v1/category/:id
//  @access Public
exports.getCategories = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category){
        return next(new ErrorResponse('Error', 404, ['category not found']))
    }

    res.status(200).json({
        error: false,
        errors: [],
        data: category,
        message: 'successful',
        status: 200
    })
});

//  @desc   Create a category
//  @route  POST /api/v1/category
//  @access Public
exports.createCategories = asyncHandler(async (req, res, next) => {
    const {name} = req.body;

    const category = await Category.create({
        name: name
    });

    res.status(200).json({
        error: false,
        errors: [],
        data: category,
        message: 'successful',
        status: 200
    });

})


exports.deleteCategories = asyncHandler(async(req, res, next) => {
    
    const category = await Category.findById(req.params.id);

    if (!category){
        return next(new ErrorResponse('Error', 404, ['category not found']))
    }

    category.remove();

    res.status(200).json({
        error: false,
        errors: [],
        data: {},
        message: 'successful',
        status: 200
    });
});