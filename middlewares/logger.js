function logger(req, res, next) {
    console.log(`I am running on method ${req.body}`);
    next();
}

module.exports = logger;
