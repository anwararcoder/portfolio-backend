"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const User_model_1 = __importDefault(require("../models/User.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const response_utils_1 = require("../utils/response.utils");
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User_model_1.default.findOne({ email });
    if (existingUser) {
        return (0, response_utils_1.errorResponse)(res, 'User already exists with this email', 400);
    }
    const user = await User_model_1.default.create({ name, email, password });
    const token = (0, jwt_utils_1.generateToken)({ id: user._id, email: user.email });
    const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        title: user.title,
        location: user.location,
        website: user.website,
        socialLinks: user.socialLinks,
        token
    };
    (0, response_utils_1.successResponse)(res, userData, 'User registered successfully', 201);
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const user = await User_model_1.default.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        return (0, response_utils_1.errorResponse)(res, 'Invalid email or password', 401);
    }
    if (!user.isActive) {
        return (0, response_utils_1.errorResponse)(res, 'Account is deactivated', 401);
    }
    const token = (0, jwt_utils_1.generateToken)({ id: user._id, email: user.email });
    const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        title: user.title,
        location: user.location,
        website: user.website,
        socialLinks: user.socialLinks,
        token
    };
    (0, response_utils_1.successResponse)(res, userData, 'Login successful');
});
exports.getProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await User_model_1.default.findById(req.user?.id);
    if (!user) {
        return (0, response_utils_1.errorResponse)(res, 'User not found', 404);
    }
    (0, response_utils_1.successResponse)(res, user, 'Profile retrieved successfully');
});
exports.updateProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const allowedFields = ['name', 'bio', 'title', 'location', 'website', 'socialLinks'];
    const updateData = {};
    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    });
    const user = await User_model_1.default.findByIdAndUpdate(req.user?.id, updateData, { new: true, runValidators: true });
    if (!user) {
        return (0, response_utils_1.errorResponse)(res, 'User not found', 404);
    }
    (0, response_utils_1.successResponse)(res, user, 'Profile updated successfully');
});
//# sourceMappingURL=auth.controller.js.map