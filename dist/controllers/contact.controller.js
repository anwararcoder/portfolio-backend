"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContactStatus = exports.replyToContact = exports.getContactById = exports.getAllContacts = exports.submitContact = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const Contact_model_1 = __importDefault(require("../models/Contact.model"));
const response_utils_1 = require("../utils/response.utils");
const email_utils_1 = require("../utils/email.utils");
exports.submitContact = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, subject, message } = req.body;
    const contactData = {
        name,
        email,
        subject,
        message,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
    };
    const contact = await Contact_model_1.default.create(contactData);
    // Send notification email (optional, handle errors gracefully)
    try {
        await (0, email_utils_1.sendContactNotification)(contact);
    }
    catch (error) {
        console.error('Failed to send email notification:', error);
    }
    (0, response_utils_1.successResponse)(res, { id: contact._id }, 'Contact form submitted successfully', 201);
});
exports.getAllContacts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const query = {};
    if (status) {
        query.status = status;
    }
    const skip = (Number(page) - 1) * Number(limit);
    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    const [contacts, total] = await Promise.all([
        Contact_model_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .lean(),
        Contact_model_1.default.countDocuments(query)
    ]);
    const pagination = {
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
        limit: Number(limit)
    };
    (0, response_utils_1.successResponse)(res, contacts, 'Contacts retrieved successfully', 200, pagination);
});
exports.getContactById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const contact = await Contact_model_1.default.findById(req.params.id);
    if (!contact) {
        return (0, response_utils_1.errorResponse)(res, 'Contact not found', 404);
    }
    // Mark as read if it's new
    if (contact.status === 'new') {
        contact.status = 'read';
        await contact.save();
    }
    (0, response_utils_1.successResponse)(res, contact, 'Contact retrieved successfully');
});
exports.replyToContact = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { reply } = req.body;
    const contact = await Contact_model_1.default.findById(req.params.id);
    if (!contact) {
        return (0, response_utils_1.errorResponse)(res, 'Contact not found', 404);
    }
    contact.reply = reply;
    contact.status = 'replied';
    contact.repliedAt = new Date();
    await contact.save();
    // Send reply email
    try {
        await (0, email_utils_1.sendContactReply)(contact, reply);
    }
    catch (error) {
        console.error('Failed to send reply email:', error);
        return (0, response_utils_1.errorResponse)(res, 'Reply saved but failed to send email', 500);
    }
    (0, response_utils_1.successResponse)(res, contact, 'Reply sent successfully');
});
exports.updateContactStatus = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { status } = req.body;
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
        return (0, response_utils_1.errorResponse)(res, 'Invalid status value', 400);
    }
    const contact = await Contact_model_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!contact) {
        return (0, response_utils_1.errorResponse)(res, 'Contact not found', 404);
    }
    (0, response_utils_1.successResponse)(res, contact, 'Contact status updated successfully');
});
exports.deleteContact = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const contact = await Contact_model_1.default.findByIdAndDelete(req.params.id);
    if (!contact) {
        return (0, response_utils_1.errorResponse)(res, 'Contact not found', 404);
    }
    (0, response_utils_1.successResponse)(res, null, 'Contact deleted successfully');
});
//# sourceMappingURL=contact.controller.js.map