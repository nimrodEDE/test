const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred", // Default message if none is provided
  });
};

module.exports = errorHandler;
