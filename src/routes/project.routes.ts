import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';

const router = express.Router();

// Validation rules
const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('startDate')
    .isISO8601()
    .withMessage('Valid start date is required'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid project ID')
];

// Routes
router.get('/', getAllProjects);
router.get('/:id', idValidation, validateRequest, getProjectById);
router.post('/', authenticate, projectValidation, validateRequest, createProject);
router.put('/:id', authenticate, idValidation, projectValidation, validateRequest, updateProject);
router.delete('/:id', authenticate, idValidation, validateRequest, deleteProject);

export default router;