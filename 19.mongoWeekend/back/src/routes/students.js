const express = require('express');
const moment = require('moment');
const mongoClient = require('../mongoDb/client');
const Student = require('../mongoDb/models/studentModel');
const faker = require('faker');

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

studentsRouter.post('/faker/:num', async (req, res, next) => {
    try {
        const num = Number(req.params.num);
        for (let i = 0; i < num; i++) {
            const name = faker.name.firstName();
            const surname = faker.name.lastName();
            const birth = faker.date.between('01/01/1990', '01/01/2000');
            const phone = faker.phone.phoneNumber('###-#######');
            const genders = ['Male', 'Female'];
            const gender = genders[Math.floor(Math.random() * genders.length)];
            const coursesArr = ['JavaScript', 'Law', 'Java', 'Finance', 'Math'];
            const courses = [];
            const coursesCount = Math.floor(Math.random() * coursesArr.length) + 1;
            for (let j = 0; j < coursesCount; j++) {
                courses.push(coursesArr.splice([Math.floor(Math.random() * coursesArr.length)], 1)[0]);
            }
            try {
                await new Student({ name, surname, birth, phone, gender, courses }).save();
            } catch (error) {
                console.log(error);
                next({ status: 502, message: 'Bad Geteway!' });
            }
            
        }
        res.json('Students added successfully!')
        res.end();
    } catch (error) {
        next({ status: 409, message: 'Cannot convert to number' });
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

studentsRouter.put('/courses', async (req, res, next) => {
    const course = 'JavaScript';
    const name = 'Chen';
    try {
        const student = await Student.updateMany({ name }, { $push: { courses: course } });
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

studentsRouter.put('/birth', async (req, res, next) => {
    const newBirth = moment('02/12/1998', 'DD/MM/YYYY').toDate();
    const name = 'Koren';
    try {
        const student = await Student.updateOne({ name }, { birth: newBirth });
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

studentsRouter.get('/substr/:substr', async (req, res, next) => {
    const substr = req.params.substr;
    try {
        const student = await Student.find({ name: { $regex: new RegExp(substr) } });
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

studentsRouter.delete('/name/:name', async (req, res, next) => {
    const name = 'Ido';
    try {
        const student = await Student.deleteOne({ name });
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

studentsRouter.delete('/birth/:birth', async (req, res, next) => {
    const birth = moment(req.params.birth, 'DD/MM/YYYY').toDate();
    try {
        const student = await Student.deleteOne({ birth: birth });
        res.json(student)
        res.end();
    } catch (error) {
        console.log(error);
        next({ status: 502, message: 'Bad Geteway!' });
    }
})

module.exports = { studentsRouter };