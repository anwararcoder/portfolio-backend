"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const response_utils_1 = require("../utils/response.utils");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, response_utils_1.errorResponse)(res, 'Validation failed', 400, errors.array());
    }
    next();
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.middleware.js.map