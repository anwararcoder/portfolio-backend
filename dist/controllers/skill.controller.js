"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkillById = exports.getAllSkills = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const Skill_model_1 = __importDefault(require("../models/Skill.model"));
const response_utils_1 = require("../utils/response.utils");
exports.getAllSkills = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 50, category, featured, sortBy = 'proficiency', sortOrder = 'desc' } = req.query;
    const query = {};
    if (category) {
        query.category = category;
    }
    if (featured !== undefined) {
        query.featured = featured === 'true';
    }
    const skip = (Number(page) - 1) * Number(limit);
    const sortOptions = { [String(sortBy)]: sortOrder === 'asc' ? 1 : -1 };
    const [skills, total] = await Promise.all([
        Skill_model_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Skill_model_1.default.countDocuments(query)
    ]);
    const pagination = {
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
        limit: Number(limit)
    };
    (0, response_utils_1.successResponse)(res, skills, 'Skills retrieved successfully', 200, pagination);
});
exports.getSkillById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const skill = await Skill_model_1.default.findById(req.params.id);
    if (!skill) {
        return (0, response_utils_1.errorResponse)(res, 'Skill not found', 404);
    }
    (0, response_utils_1.successResponse)(res, skill, 'Skill retrieved successfully');
});
exports.createSkill = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    const payload = { ...body };
    if (req.file) {
        payload.icon = `/uploads/${req.file.filename}`;
    }
    const skill = await Skill_model_1.default.create(payload);
    (0, response_utils_1.successResponse)(res, skill, 'Skill created successfully', 201);
});
exports.updateSkill = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    const updateData = { ...body };
    if (req.file) {
        updateData.icon = `/uploads/${req.file.filename}`;
    }
    const skill = await Skill_model_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!skill) {
        return (0, response_utils_1.errorResponse)(res, 'Skill not found', 404);
    }
    (0, response_utils_1.successResponse)(res, skill, 'Skill updated successfully');
});
exports.deleteSkill = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const skill = await Skill_model_1.default.findByIdAndDelete(req.params.id);
    if (!skill) {
        return (0, response_utils_1.errorResponse)(res, 'Skill not found', 404);
    }
    (0, response_utils_1.successResponse)(res, null, 'Skill deleted successfully');
});
//# sourceMappingURL=skill.controller.js.map