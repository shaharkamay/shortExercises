const express = require('express');
const moment = require('moment');
const mongoClient = require('../mongoDb/client');
const User = require('../mongoDb/models/userModel');
const Post = require('../mongoDb/models/postModel');
const faker = require('faker');

const postsRouter = express.Router();

postsRouter.post('/', async (req, res, next) => {
    const post = req.body.post;
    const { username, title, body } = post;
    console.log(post);
    if(post
        && username 
        && title 
        && body) {
        try {
            await new Post({ username, title, body }).save();
            res.json('Post added successfully!')
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
});

postsRouter.get('/', async (req, res, next) => {
    try {
        const post = await Post.find({});
        res.json(post)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

postsRouter.get('/username/:username', async (req, res, next) => {
    const username = req.params.username;
    if(username) {
        try {
            const posts = await Post.find({ username });
            res.json(posts)
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
})

module.exports = postsRouter;