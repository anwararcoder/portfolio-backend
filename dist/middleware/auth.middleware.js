"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticate = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const response_utils_1 = require("../utils/response.utils");
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return (0, response_utils_1.errorResponse)(res, 'Access denied. No token provided.', 401);
        }
        const decoded = (0, jwt_utils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return (0, response_utils_1.errorResponse)(res, 'Invalid token.', 401);
    }
};
exports.authenticate = authenticate;
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            const decoded = (0, jwt_utils_1.verifyToken)(token);
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        // Continue without authentication if token is invalid
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.middleware.js.map