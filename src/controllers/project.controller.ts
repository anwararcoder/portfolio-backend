import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Project from '../models/Project.model';
import { successResponse, errorResponse } from '../utils/response.utils';
import { AuthRequest, QueryParams } from '../types';

export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    featured,
    status = 'active',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  const query: any = { status };
  
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
  const sortOptions: any = { [String(sortBy)]: sortOrder === 'asc' ? 1 : -1 };

  const [projects, total] = await Promise.all([
    Project.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Project.countDocuments(query)
  ]);

  const pagination = {
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    total,
    limit: Number(limit)
  };

  successResponse(res, projects, 'Projects retrieved successfully', 200, pagination);
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return errorResponse(res, 'Project not found', 404);
  }

  successResponse(res, project, 'Project retrieved successfully');
});

export const createProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body as any;

  // Normalize arrays if sent as comma-separated strings via multipart/form-data
  const normalizeArray = (value: any): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
    return [];
  };

  const technologies = normalizeArray(body.technologies);
  const imagesFromBody = normalizeArray(body.images);

  let uploadedImages: string[] = [];
  const filesAny = (req.files as any);
  if (Array.isArray(filesAny)) {
    uploadedImages = filesAny.map((f: any) => `/uploads/${f.filename}`);
  } else if (filesAny && Array.isArray(filesAny.images)) {
    uploadedImages = filesAny.images.map((f: any) => `/uploads/${f.filename}`);
  }

  const projectPayload: any = {
    ...body,
    technologies,
    images: [...imagesFromBody, ...uploadedImages]
  };

  const project = await Project.create(projectPayload);
  successResponse(res, project, 'Project created successfully', 201);
});

export const updateProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const body = req.body as any;

  const normalizeArray = (value: any): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
    return [];
  };

  const updateData: any = { ...body };
  if (body.technologies !== undefined) {
    updateData.technologies = normalizeArray(body.technologies);
  }
  if (body.images !== undefined) {
    updateData.images = normalizeArray(body.images);
  }

  let uploadedImages: string[] = [];
  const filesAny = (req.files as any);
  if (Array.isArray(filesAny)) {
    uploadedImages = filesAny.map((f: any) => `/uploads/${f.filename}`);
  } else if (filesAny && Array.isArray(filesAny.images)) {
    uploadedImages = filesAny.images.map((f: any) => `/uploads/${f.filename}`);
  }

  if (uploadedImages.length) {
    updateData.images = [...(updateData.images || []), ...uploadedImages];
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!project) {
    return errorResponse(res, 'Project not found', 404);
  }

  successResponse(res, project, 'Project updated successfully');
});

export const deleteProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return errorResponse(res, 'Project not found', 404);
  }

  successResponse(res, null, 'Project deleted successfully');
});