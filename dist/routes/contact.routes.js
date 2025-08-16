"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const contact_controller_1 = require("../controllers/contact.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const email_utils_1 = require("../utils/email.utils");
const router = express_1.default.Router();
// Validation rules
const contactValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('subject')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Subject must be between 5 and 200 characters'),
    (0, express_validator_1.body)('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters')
];
const replyValidation = [
    (0, express_validator_1.body)('reply')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Reply must be between 10 and 2000 characters')
];
const statusValidation = [
    (0, express_validator_1.body)('status')
        .isIn(['new', 'read', 'replied', 'archived'])
        .withMessage('Invalid status value')
];
const idValidation = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('Invalid contact ID')
];
// Public routes
router.post('/', contactValidation, validation_middleware_1.validateRequest, contact_controller_1.submitContact);
// Test email endpoint (for debugging)
router.get('/test-email', async (req, res) => {
    try {
        const isConnected = await (0, email_utils_1.testEmailConnection)();
        if (isConnected) {
            res.json({ success: true, message: 'Email connection test successful' });
        }
        else {
            res.status(500).json({ success: false, message: 'Email connection test failed' });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Email test error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Protected routes (require authentication)
router.use(auth_middleware_1.authenticate);
router.get('/', contact_controller_1.getAllContacts);
router.get('/:id', auth_middleware_1.authenticate, idValidation, validation_middleware_1.validateRequest, contact_controller_1.getContactById);
router.put('/:id/reply', auth_middleware_1.authenticate, idValidation, replyValidation, validation_middleware_1.validateRequest, contact_controller_1.replyToContact);
router.put('/:id/status', auth_middleware_1.authenticate, idValidation, statusValidation, validation_middleware_1.validateRequest, contact_controller_1.updateContactStatus);
router.delete('/:id', auth_middleware_1.authenticate, idValidation, validation_middleware_1.validateRequest, contact_controller_1.deleteContact);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map