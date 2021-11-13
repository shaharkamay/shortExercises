const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoClient = require('./mongoDb/client');
const { studentsRouter } = require('./routes/students');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const errorHandler = require('./error-handling/error-handler');

mongoClient.init();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use('/students', studentsRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`app started on port: ${port}`);
})