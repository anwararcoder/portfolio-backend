import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experience.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { upload } from '../middleware/upload.middleware';

const router = express.Router();

// Validation rules
const experienceValidation = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Job title must be between 2 and 100 characters'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  body('startDate')
    .isISO8601()
    .withMessage('Valid start date is required'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('responsibilities')
    .isArray({ min: 1 })
    .withMessage('At least one responsibility is required'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('type')
    .isIn(['full-time', 'part-time', 'contract', 'internship'])
    .withMessage('Invalid employment type')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid experience ID')
];

// Routes
router.get('/', getAllExperience);
router.get('/:id', idValidation, validateRequest, getExperienceById);
router.post('/', authenticate, upload.single('companyLogo'), experienceValidation, validateRequest, createExperience);
router.put('/:id', authenticate, upload.single('companyLogo'), idValidation, experienceValidation, validateRequest, updateExperience);
router.delete('/:id', authenticate, idValidation, validateRequest, deleteExperience);

export default router;