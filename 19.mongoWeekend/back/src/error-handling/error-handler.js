const errorHandler = (err, req, res, next) => {
    if(err.status) {
        res.status(err.status).json(err.message);
        res.end();
    } else {
        res.status(500).json('Internal Server Error');
        res.end();
    }
}

module.exports = errorHandler;