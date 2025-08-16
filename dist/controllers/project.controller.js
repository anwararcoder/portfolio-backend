"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const Project_model_1 = __importDefault(require("../models/Project.model"));
const response_utils_1 = require("../utils/response.utils");
exports.getAllProjects = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, search, category, featured, status = 'active', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const query = { status };
    if (search) {
        query.$text = { $search: search };
    }
    if (category) {
        query.category = category;
    }
    if (featured !== undefined) {
        query.featured = featured === 'true';
    }
    const skip = (Number(page) - 1) * Number(limit);
    const sortOptions = { [String(sortBy)]: sortOrder === 'asc' ? 1 : -1 };
    const [projects, total] = await Promise.all([
        Project_model_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Project_model_1.default.countDocuments(query)
    ]);
    const pagination = {
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
        limit: Number(limit)
    };
    (0, response_utils_1.successResponse)(res, projects, 'Projects retrieved successfully', 200, pagination);
});
exports.getProjectById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const project = await Project_model_1.default.findById(req.params.id);
    if (!project) {
        return (0, response_utils_1.errorResponse)(res, 'Project not found', 404);
    }
    (0, response_utils_1.successResponse)(res, project, 'Project retrieved successfully');
});
exports.createProject = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const project = await Project_model_1.default.create(req.body);
    (0, response_utils_1.successResponse)(res, project, 'Project created successfully', 201);
});
exports.updateProject = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const project = await Project_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
        return (0, response_utils_1.errorResponse)(res, 'Project not found', 404);
    }
    (0, response_utils_1.successResponse)(res, project, 'Project updated successfully');
});
exports.deleteProject = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const project = await Project_model_1.default.findByIdAndDelete(req.params.id);
    if (!project) {
        return (0, response_utils_1.errorResponse)(res, 'Project not found', 404);
    }
    (0, response_utils_1.successResponse)(res, null, 'Project deleted successfully');
});
//# sourceMappingURL=project.controller.js.map