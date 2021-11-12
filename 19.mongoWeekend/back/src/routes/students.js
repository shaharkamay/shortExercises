const express = require('express');
const moment = require('moment');
const mongoClient = require('../mongoDb/client');
const Student = require('../mongoDb/models/studentModel');

const studentsRouter = express.Router();

studentsRouter.post('/', async (req, res, next) => {
    const student = req.body.student;
    const { name, surname, phone, gender, courses } = student;
    const birth = moment(student.birth, "DD/MM/YYYY").toDate();
    console.log(student);
    if(student
        && name 
        && surname 
        && birth 
        && phone 
        && gender 
        && courses) {
            try {
                mongoClient.init();
                await new Student({ name, surname, birth, phone, gender, courses }).save();
                mongoClient.close();
                res.json('Student added successfully!')
                res.end();
            } catch (error) {
                console.log(error);
                next({ status: 502, message: 'Bad Geteway!' });
            }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
});

studentsRouter.get('/', async (req, res, next) => {
    try {
        mongoClient.init();
        const student = await Student.find({});
        mongoClient.close();
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

studentsRouter.get('/name/:name', async (req, res, next) => {
    const name = req.params.name;
    if(name) {
        try {
            mongoClient.init();
            const student = await Student.find({ name });
            mongoClient.close();
            res.json(student)
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
})

studentsRouter.get('/courses/:course', async (req, res, next) => {
    const course = req.params.course;
    if(course) {
        try {
            const student = await Student.find({ courses: { $in: course } });
            res.json(student)
            res.end();
        } catch (error) {
            console.log(error);
            next({ status: 502, message: 'Bad Geteway!' });
        }
    } else {
        next({ status: 401, message: 'Bad request!' })
    }
})

module.exports = { studentsRouter };