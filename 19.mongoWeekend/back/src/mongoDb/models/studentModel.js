const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    birth: {
        type: Date,
    },
    phone: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
    },
    courses: {
        type: Array,
    }
})

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;