"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_utils_1 = require("../utils/response.utils");
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return (0, response_utils_1.errorResponse)(res, 'Invalid ID format', 400);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0];
        return (0, response_utils_1.errorResponse)(res, `${field} already exists`, 400);
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((val) => val.message);
        return (0, response_utils_1.errorResponse)(res, 'Validation Error', 400, errors);
    }
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return (0, response_utils_1.errorResponse)(res, 'Invalid token', 401);
    }
    if (err.name === 'TokenExpiredError') {
        return (0, response_utils_1.errorResponse)(res, 'Token expired', 401);
    }
    return (0, response_utils_1.errorResponse)(res, err.message || 'Internal server error', err.statusCode || 500);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map