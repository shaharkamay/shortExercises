const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { studentsRouter } = require('./routes/students');
const errorHandler = require('./error-handling/error-handler');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use('/students', studentsRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`app started on port: ${port}`);
})