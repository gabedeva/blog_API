const express = require('express');

// routers
// const authRoutes = require('./routers/auth.router');
// const conversationRoutes = require('./routers/conversations.router');
// const messageRoutes = require('./routers/messages.router');
const postRoutes = require('./routers/posts.router');
// const emailRoutes = require('./routers/emails.router');
// const s3Routes = require('./routers/s3.router');
// const userRoutes = require('./routers/users.router');

// create router
const router = express.Router();

// define routes
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/conversations', conversationRoutes);
// router.use('/messages', messageRoutes);
router.use('/posts', postRoutes);
// router.use('/emails', emailRoutes);
// router.use('/utils/s3', s3Routes);

// for unmapped routes
router.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'Blog backend service',
            version: '0.1.0'   
        }
    });

});

module.exports = router;