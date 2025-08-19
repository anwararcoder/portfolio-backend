import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import User from '../models/User.model';
import { generateToken } from '../utils/jwt.utils';
import { successResponse, errorResponse } from '../utils/response.utils';
import { AuthRequest } from '../types';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Handle avatar upload
  let avatar;
  if (req.file) {
    // Save the file path or URL as avatar
    avatar = `/uploads/${req.file.filename}`;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, 'User already exists with this email', 400);
  }

  const user = await User.create({ name, email, password, avatar });
  const token = generateToken({ id: user._id, email: user.email });

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

  successResponse(res, userData, 'User registered successfully', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return errorResponse(res, 'Invalid email or password', 401);
  }

  if (!user.isActive) {
    return errorResponse(res, 'Account is deactivated', 401);
  }

  const token = generateToken({ id: user._id, email: user.email });

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

  successResponse(res, userData, 'Login successful');
});

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.id);
  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  successResponse(res, user, 'Profile retrieved successfully');
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const allowedFields = ['name', 'bio', 'title', 'location', 'website', 'socialLinks'];
  const updateData: any = {};

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  // Handle avatar upload
  if (req.file) {
    updateData.avatar = `/uploads/${req.file.filename}`;
  }

  const user = await User.findByIdAndUpdate(
    req.user?.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  successResponse(res, user, 'Profile updated successfully');
});