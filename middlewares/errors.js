function errorHandler(err, req, res, next) {
  if (res.statusCode === 200) {
    res.status(500);
  }
  res.json({
    message: err.message,
  });
}

function notFoundHandler(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);  // Pass error to the error handling middleware
}

 module.exports ={errorHandler,notFoundHandler} ;