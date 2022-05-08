const mongoose = require('mongoose');
const asyncHandler = require('../middleware/async.mw');
const ErrorResponse = require('../utils/errorResponse.util');

// model
const Post = require('../models/Post.model');

//  @desc   Get all posts
//  @route  GET /api/v1/posts
//  @access Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//  @desc   Get a post
//  @route  GET /api/v1/posts/:id
//  @access Public
exports.getPost = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new ErrorResponse('Error', 404, ['post not found']));
    }

    res.status(200).json({
        error: false,
        errors: [],
        data: post,
        message: 'successful',
        status: 200
    });
});

//  @desc   Create a post
//  @route  POST /api/v1/posts
//  @access Private
exports.createPost = asyncHandler(async (req, res, next) => {

    const postExist = await Post.findOne().where(title === title);

    if(postExist){
        return next(new ErrorResponse('Error', 400, ['post with title and description already exist. create a new one']))
    }
    
    const { title, description, username, photo } = req.body;

    const newPost = await Post.create({
        title: title,
        description: description,
        username: username,
        photo: photo
    });
    
    res.status(200).json({
        error: false,
        errors: [],
        data: newPost,
        message: 'successful',
        status: 200
    });
});

//  @desc   Update a post
//  @route  PUT /api/v1/posts/:id
//  @access Private
exports.updatePost = asyncHandler(async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return next(new ErrorResponse('Error', 404, ['cannot find required post']));
        }

        // checking to make sure user owns the post
        if(post.username === req.body.username) {
            try{
                const upPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true, runValidators: true});
                res.status(200).json({
                    error: error,
                    errors: [],
                    data: upPost,
                    message: 'successful',
                    status: 200
                });

            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You are not authorised to update this post. You can only update your post!")
        } 
    } catch(err){
        res.status(500).json(err);
    }
});


//  @desc   Delete a post
//  @route  DELETE /api/v1/posts/:id
//  @access Private
exports.deletePost = asyncHandler(async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json({
                    data: {},
                    message: 'successful'
                });
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You are not authorised to delete this post. You can only delete post you created")
        }

    } catch(err){
        res.status(500).json(err);
    }
    
});


//  @desc   Like or dislike post
//  @route  PUT /api/v1/posts/:id/like
//  @access Private
exports.likeDislikePost = asyncHandler(async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: {likes: req.body.userId} });
            
            res.status(200).json({
                error: false,
                errors: [],
                data: post,
                message: 'The post has been liked',
                status: 200
            });
        } else {
            await post.updateOne({ $pull: {likes: req.body.userId} });
            res.status(200).json(err)
        }
    } catch (err){
        res.status(500).json(err);
    }
});
