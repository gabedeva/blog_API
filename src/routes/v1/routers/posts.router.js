const express = require('express');
const asyncify = require('express-asyncify');

// importing controllers methods
const {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
} = require('../../../controllers/post.controller');

// importing advanced middleware
const advancedResults = require('../../../middleware/advancedResults.mw');

// creating router and importinig model
const router = express.Router({ mergeParams: true });
const Post = require('../../../models/Post.model');

// creating routes for controller methods
router.route('/').get(advancedResults(Post), getPosts);
router.route('/:id').get(getPost);
router.route('/').post(createPost);
router.route('/:id').put(updatePost);
router.route('/:id').delete(deletePost);

module.exports = router;