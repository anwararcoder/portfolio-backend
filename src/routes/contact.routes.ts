import express from 'express';
import { body, param } from 'express-validator';
import {
  submitContact,
  getAllContacts,
  getContactById,
  replyToContact,
  updateContactStatus,
  deleteContact
} from '../controllers/contact.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { testEmailConnection } from '../utils/email.utils';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

const replyValidation = [
  body('reply')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Reply must be between 10 and 2000 characters')
];

const statusValidation = [
  body('status')
    .isIn(['new', 'read', 'replied', 'archived'])
    .withMessage('Invalid status value')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid contact ID')
];

// Public routes
router.post('/', contactValidation, validateRequest, submitContact);

// Test email endpoint (for debugging)
router.get('/test-email', async (req, res) => {
  try {
    const isConnected = await testEmailConnection();
    if (isConnected) {
      res.json({ success: true, message: 'Email connection test successful' });
    } else {
      res.status(500).json({ success: false, message: 'Email connection test failed' });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Email test error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Protected routes (require authentication)
router.use(authenticate);
router.get('/', getAllContacts);
router.get('/:id', authenticate, idValidation, validateRequest, getContactById);
router.put('/:id/reply', authenticate, idValidation, replyValidation, validateRequest, replyToContact);
router.put('/:id/status', authenticate, idValidation, statusValidation, validateRequest, updateContactStatus);
router.delete('/:id', authenticate, idValidation, validateRequest, deleteContact);

export default router;