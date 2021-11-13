const express = require('express');
const mongoClient = require('../mongoDb/client');
const User = require('../mongoDb/models/userModel');
const Post = require('../mongoDb/models/postModel');
const faker = require('faker');

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    const user = req.body.user;
    const { username, first_name, last_name } = user;
    console.log(user);
    if(user
        && username 
        && first_name 
        && last_name) {
        try {
            await new User({ username, first_name, last_name }).save();
            res.json('User added successfully!')
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
});

usersRouter.get('/', async (req, res, next) => {
    try {
        const user = await User.find({});
        res.json(user)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})



module.exports = usersRouter;