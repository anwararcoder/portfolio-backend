import { Request } from 'express';
import { Document } from 'mongoose';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
  file?: Express.Multer.File;
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  title?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  isActive: boolean;
  comparePassword(password: string): Promise<boolean>;
}

export interface IProject extends Document {
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'active' | 'archived' | 'in-progress';
  category: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  proficiency: number;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  featured: boolean;
}

export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
  companyLogo?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
}

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  reply?: string;
  repliedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}