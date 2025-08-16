"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getAllExperience = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const Experience_model_1 = __importDefault(require("../models/Experience.model"));
const response_utils_1 = require("../utils/response.utils");
exports.getAllExperience = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'startDate', sortOrder = 'desc' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    const [experiences, total] = await Promise.all([
        Experience_model_1.default.find()
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Experience_model_1.default.countDocuments()
    ]);
    const pagination = {
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
        limit: Number(limit)
    };
    (0, response_utils_1.successResponse)(res, experiences, 'Experience retrieved successfully', 200, pagination);
});
exports.getExperienceById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const experience = await Experience_model_1.default.findById(req.params.id);
    if (!experience) {
        return (0, response_utils_1.errorResponse)(res, 'Experience not found', 404);
    }
    (0, response_utils_1.successResponse)(res, experience, 'Experience retrieved successfully');
});
exports.createExperience = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const experience = await Experience_model_1.default.create(req.body);
    (0, response_utils_1.successResponse)(res, experience, 'Experience created successfully', 201);
});
exports.updateExperience = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const experience = await Experience_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!experience) {
        return (0, response_utils_1.errorResponse)(res, 'Experience not found', 404);
    }
    (0, response_utils_1.successResponse)(res, experience, 'Experience updated successfully');
});
exports.deleteExperience = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const experience = await Experience_model_1.default.findByIdAndDelete(req.params.id);
    if (!experience) {
        return (0, response_utils_1.errorResponse)(res, 'Experience not found', 404);
    }
    (0, response_utils_1.successResponse)(res, null, 'Experience deleted successfully');
});
//# sourceMappingURL=experience.controller.js.map