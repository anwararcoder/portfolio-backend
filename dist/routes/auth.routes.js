"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = express_1.default.Router();
// Validation rules
const registerValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];
const loginValidation = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
];
const updateProfileValidation = [
    (0, express_validator_1.body)('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('bio')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Bio cannot exceed 500 characters'),
    (0, express_validator_1.body)('website')
        .optional()
        .isURL()
        .withMessage('Please provide a valid URL')
];
// Routes
// Use multer before validators to parse multipart/form-data
router.post('/register', upload_middleware_1.upload.single('avatar'), registerValidation, validation_middleware_1.validateRequest, auth_controller_1.register);
router.post('/login', loginValidation, validation_middleware_1.validateRequest, auth_controller_1.login);
router.get('/profile', auth_middleware_1.authenticate, auth_controller_1.getProfile);
router.put('/profile', auth_middleware_1.authenticate, upload_middleware_1.upload.single('avatar'), updateProfileValidation, validation_middleware_1.validateRequest, auth_controller_1.updateProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map