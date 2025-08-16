"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const skill_controller_1 = require("../controllers/skill.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = express_1.default.Router();
// Validation rules
const skillValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Skill name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('category')
        .isIn(['frontend', 'backend', 'database', 'tools', 'other'])
        .withMessage('Invalid category'),
    (0, express_validator_1.body)('proficiency')
        .isInt({ min: 1, max: 100 })
        .withMessage('Proficiency must be between 1 and 100'),
    (0, express_validator_1.body)('yearsOfExperience')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Years of experience must be a positive number')
];
const idValidation = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('Invalid skill ID')
];
// Routes
router.get('/', skill_controller_1.getAllSkills);
router.get('/:id', idValidation, validation_middleware_1.validateRequest, skill_controller_1.getSkillById);
router.post('/', auth_middleware_1.authenticate, skillValidation, validation_middleware_1.validateRequest, skill_controller_1.createSkill);
router.put('/:id', auth_middleware_1.authenticate, idValidation, skillValidation, validation_middleware_1.validateRequest, skill_controller_1.updateSkill);
router.delete('/:id', auth_middleware_1.authenticate, idValidation, validation_middleware_1.validateRequest, skill_controller_1.deleteSkill);
exports.default = router;
//# sourceMappingURL=skill.routes.js.map