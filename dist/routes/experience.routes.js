"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const experience_controller_1 = require("../controllers/experience.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = express_1.default.Router();
// Validation rules
const experienceValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Job title must be between 2 and 100 characters'),
    (0, express_validator_1.body)('company')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Company name must be between 2 and 100 characters'),
    (0, express_validator_1.body)('location')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Location must be between 2 and 100 characters'),
    (0, express_validator_1.body)('startDate')
        .isISO8601()
        .withMessage('Valid start date is required'),
    (0, express_validator_1.body)('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date must be a valid date'),
    (0, express_validator_1.body)('description')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),
    (0, express_validator_1.body)('responsibilities')
        .isArray({ min: 1 })
        .withMessage('At least one responsibility is required'),
    (0, express_validator_1.body)('technologies')
        .isArray({ min: 1 })
        .withMessage('At least one technology is required'),
    (0, express_validator_1.body)('type')
        .isIn(['full-time', 'part-time', 'contract', 'internship'])
        .withMessage('Invalid employment type')
];
const idValidation = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('Invalid experience ID')
];
// Routes
router.get('/', experience_controller_1.getAllExperience);
router.get('/:id', idValidation, validation_middleware_1.validateRequest, experience_controller_1.getExperienceById);
router.post('/', auth_middleware_1.authenticate, upload_middleware_1.upload.single('companyLogo'), experienceValidation, validation_middleware_1.validateRequest, experience_controller_1.createExperience);
router.put('/:id', auth_middleware_1.authenticate, upload_middleware_1.upload.single('companyLogo'), idValidation, experienceValidation, validation_middleware_1.validateRequest, experience_controller_1.updateExperience);
router.delete('/:id', auth_middleware_1.authenticate, idValidation, validation_middleware_1.validateRequest, experience_controller_1.deleteExperience);
exports.default = router;
//# sourceMappingURL=experience.routes.js.map