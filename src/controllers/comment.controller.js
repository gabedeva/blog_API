const mongoose = require('mongoose');
const asyncHandler = require('../middleware/async.mw');
const ErrorResponse = require('../utils/errorResponse.util');

const Post = require('../models/Post.model');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');


//  @desc   Get all comments
//  @route  GET /api/v1/comments
//  @access Public
exports.getComments = asyncHandler(async(req, res, next) => {
    const comments = await Comment.find().populate('post');

    if(!comments){
        return next(new ErrorResponse('Error', 404, ['unable find comments']));
    }

    res.status(200).json(res.advancedResults).populate('post');
});

//  @desc   Get a single comment
//  @route  GET /api/v1/comments
//  @access Public
exports.getComment = asyncHandler(async(req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if(!comment){
        return next(new ErrorResponse('Error', 404, ['comment not found']))
    }

    res.status(200).json({
        error: false,
        errors: [],
        data: comment,
        message: 'successful',
        status: 200
    });
});

//  @desc   Create a comment
//  @route  POST /api/v1/posts/:id/comments
//  @route  POST /api/v1/comments
//  @access Public
exports.createComment = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');

    if(!user && !mongoose.Types.ObjectId.isValid(user)){
        return next(new ErrorResponse('cannot find user', 404, ['user id is required to be a valid object id']))
    }

    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorResponse('Error', 400, ['cannot find post']));
    }

    const { text, user, name } = req.body;

    const newComment = await Comment.create({
        text: text,
        user: user.id,
        name: user.name
    });

    // await post.comments.push(newComment);
    await post.comments.unshift(newComment); // unshift to add it to the beginning

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, { new: true, runValidators: true });

    res.status(200).json({
        error: false,
        errors: [],
        data: updatedPost,
        message: 'successful',
        status: 200
    });
});