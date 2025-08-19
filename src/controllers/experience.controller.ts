import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Experience from '../models/Experience.model';
import { successResponse, errorResponse } from '../utils/response.utils';
import { AuthRequest, QueryParams } from '../types';

export const getAllExperience = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'startDate',
    sortOrder = 'desc'
  }: QueryParams = req.query;

  const skip = (Number(page) - 1) * Number(limit);
  const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const [experiences, total] = await Promise.all([
    Experience.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Experience.countDocuments()
  ]);

  const pagination = {
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    total,
    limit: Number(limit)
  };

  successResponse(res, experiences, 'Experience retrieved successfully', 200, pagination);
});

export const getExperienceById = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.findById(req.params.id);
  
  if (!experience) {
    return errorResponse(res, 'Experience not found', 404);
  }

  successResponse(res, experience, 'Experience retrieved successfully');
});

export const createExperience = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body as any;
  const normalizeArray = (value: any): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
    return [];
  };

  const payload: any = {
    ...body,
    responsibilities: normalizeArray(body.responsibilities),
    technologies: normalizeArray(body.technologies)
  };

  if (req.file) {
    payload.companyLogo = `/uploads/${req.file.filename}`;
  }

  const experience = await Experience.create(payload);
  successResponse(res, experience, 'Experience created successfully', 201);
});

export const updateExperience = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body as any;
  const updateData: any = { ...body };

  const normalizeArray = (value: any): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
    return [];
  };

  if (body.responsibilities !== undefined) {
    updateData.responsibilities = normalizeArray(body.responsibilities);
  }
  if (body.technologies !== undefined) {
    updateData.technologies = normalizeArray(body.technologies);
  }
  if (req.file) {
    updateData.companyLogo = `/uploads/${req.file.filename}`;
  }

  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!experience) {
    return errorResponse(res, 'Experience not found', 404);
  }

  successResponse(res, experience, 'Experience updated successfully');
});

export const deleteExperience = asyncHandler(async (req: AuthRequest, res: Response) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);

  if (!experience) {
    return errorResponse(res, 'Experience not found', 404);
  }

  successResponse(res, null, 'Experience deleted successfully');
});