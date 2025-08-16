"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const project_controller_1 = require("../controllers/project.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = express_1.default.Router();
// Validation rules
const projectValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    (0, express_validator_1.body)('description')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters'),
    (0, express_validator_1.body)('technologies')
        .isArray({ min: 1 })
        .withMessage('At least one technology is required'),
    (0, express_validator_1.body)('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    (0, express_validator_1.body)('startDate')
        .isISO8601()
        .withMessage('Valid start date is required'),
    (0, express_validator_1.body)('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date must be a valid date')
];
const idValidation = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('Invalid project ID')
];
// Routes
router.get('/', project_controller_1.getAllProjects);
router.get('/:id', idValidation, validation_middleware_1.validateRequest, project_controller_1.getProjectById);
router.post('/', auth_middleware_1.authenticate, projectValidation, validation_middleware_1.validateRequest, project_controller_1.createProject);
router.put('/:id', auth_middleware_1.authenticate, idValidation, projectValidation, validation_middleware_1.validateRequest, project_controller_1.updateProject);
router.delete('/:id', auth_middleware_1.authenticate, idValidation, validation_middleware_1.validateRequest, project_controller_1.deleteProject);
exports.default = router;
//# sourceMappingURL=project.routes.js.map