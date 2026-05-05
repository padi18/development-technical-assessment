const errorMiddleware = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;
