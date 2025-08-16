import express from 'express';
import { body, param } from 'express-validator';
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skill.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';

const router = express.Router();

// Validation rules
const skillValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Skill name must be between 2 and 50 characters'),
  body('category')
    .isIn(['frontend', 'backend', 'database', 'tools', 'other'])
    .withMessage('Invalid category'),
  body('proficiency')
    .isInt({ min: 1, max: 100 })
    .withMessage('Proficiency must be between 1 and 100'),
  body('yearsOfExperience')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Years of experience must be a positive number')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid skill ID')
];

// Routes
router.get('/', getAllSkills);
router.get('/:id', idValidation, validateRequest, getSkillById);
router.post('/', authenticate, skillValidation, validateRequest, createSkill);
router.put('/:id', authenticate, idValidation, skillValidation, validateRequest, updateSkill);
router.delete('/:id', authenticate, idValidation, validateRequest, deleteSkill);

export default router;