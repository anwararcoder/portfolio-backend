import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Skill from '../models/Skill.model';
import { successResponse, errorResponse } from '../utils/response.utils';
import { AuthRequest, QueryParams } from '../types';

export const getAllSkills = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 50,
    category,
    featured,
    sortBy = 'proficiency',
    sortOrder = 'desc'
  } = req.query;

  const query: any = {};
  
  if (category) {
    query.category = category;
  }
  
  if (featured !== undefined) {
    query.featured = featured === 'true';
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOptions: any = { [String(sortBy)]: sortOrder === 'asc' ? 1 : -1 };

  const [skills, total] = await Promise.all([
    Skill.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Skill.countDocuments(query)
  ]);

  const pagination = {
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    total,
    limit: Number(limit)
  };

  successResponse(res, skills, 'Skills retrieved successfully', 200, pagination);
});

export const getSkillById = asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.findById(req.params.id);
  
  if (!skill) {
    return errorResponse(res, 'Skill not found', 404);
  }

  successResponse(res, skill, 'Skill retrieved successfully');
});

export const createSkill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body as any;
  const payload: any = { ...body };
  if (req.file) {
    payload.icon = `/uploads/${req.file.filename}`;
  }
  const skill = await Skill.create(payload);
  successResponse(res, skill, 'Skill created successfully', 201);
});

export const updateSkill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body as any;
  const updateData: any = { ...body };
  if (req.file) {
    updateData.icon = `/uploads/${req.file.filename}`;
  }
  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!skill) {
    return errorResponse(res, 'Skill not found', 404);
  }

  successResponse(res, skill, 'Skill updated successfully');
});

export const deleteSkill = asyncHandler(async (req: AuthRequest, res: Response) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);

  if (!skill) {
    return errorResponse(res, 'Skill not found', 404);
  }

  successResponse(res, null, 'Skill deleted successfully');
});