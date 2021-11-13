const express = require('express');
const moment = require('moment');
const mongoClient = require('../mongoDb/client');
const User = require('../mongoDb/models/userModel');
const Post = require('../mongoDb/models/postModel');
const Comment = require('../mongoDb/models/commentModel');
const faker = require('faker');

const commentsRouter = express.Router();

commentsRouter.post('/', async (req, res, next) => {
    const commentObj = req.body.comment;
    const { username, comment } = commentObj;
    const postTitle = 'Reports a bug in your code';
    const post = await Post.findOne({ title: postTitle })
    console.log(post._id);
    if(commentObj
        && username 
        && comment
        && post) {
        try {
            await new Comment({ username, comment, post: post._id }).save();
            res.json('Comment added successfully!')
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
});

commentsRouter.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.find({});
        res.json(comments)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

commentsRouter.get('/username/:username', async (req, res, next) => {
    const username = req.params.username;
    if(username) {
        try {
            const comments = await Comment.find({ username });
            res.json(comments)
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
})

commentsRouter.get('/post', async (req, res, next) => {
    const postTitle = req.body.title;
    if(postTitle) {
        try {
            const postId = await Post.findOne({ title: postTitle });
            const comments = await Comment.find({ post: postId });
            res.json(comments)
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
})

module.exports = commentsRouter;