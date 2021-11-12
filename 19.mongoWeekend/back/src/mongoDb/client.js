const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

async function init() {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('connected successfully!');
    }).catch(() => {
        console.log('connection to database failed');
    });
}

async function close() {
    await mongoose.connection.close();
    console.log('closed connection to database')
}

module.exports = {
    init,
    close,
}