// middlewares/error.middleware.js
import {ApiError} from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // mongoose invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // mongoose validation error
  if (err.name === "ValidationError") {   
    statusCode = 400;
    message = "Validation Error";
  }
  // mongoose duplicate key error 
  if (err.code && err.code === 11000) {       
    statusCode = 409;
    message = "Duplicate field value entered";
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
};

export default errorHandler;
