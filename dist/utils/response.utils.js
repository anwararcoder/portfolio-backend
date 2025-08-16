"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message, statusCode = 200, pagination) => {
    const response = {
        success: true,
        data,
        ...(message && { message }),
        ...(pagination && { pagination })
    };
    return res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const errorResponse = (res, message, statusCode = 400, errors) => {
    const response = {
        success: false,
        message,
        ...(errors && { errors })
    };
    return res.status(statusCode).json(response);
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.utils.js.map