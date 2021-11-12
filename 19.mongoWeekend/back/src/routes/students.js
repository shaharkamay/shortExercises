const express = require('express');
const moment = require('moment');
const mongoClient = require('../mongoDb/client');
const Student = require('../mongoDb/models/studentModel');

const studentsRouter = express.Router();

mongoClient.init();

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
                await new Student({ name, surname, birth, phone, gender, courses }).save();
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
        const student = await Student.find({});
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
            const student = await Student.find({ name });
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

studentsRouter.get('/courses', async (req, res, next) => {
    const course = req.body.course;
    const gender = req.body.gender;
    if(course) {
        try {
            const student = await Student.find({ $and: [ { courses: { $in: course }, gender } ] });
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

studentsRouter.get('/birth', async (req, res, next) => {
    const compareDate = moment('01/01/1998', "DD/MM/YYYY").toDate();
    try {
        const student = await Student.find({ birth: { $gt: compareDate } });
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

studentsRouter.get('/phone', async (req, res, next) => {
    const phoneCompare = '054';
    try {
        const student = await Student.find({ phone: { $regex: new RegExp(`^${phoneCompare}`) } });
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})


module.exports = { studentsRouter };