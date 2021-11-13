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
    const postTitle = 'Forks your repo on github';
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



module.exports = commentsRouter;