import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import Contact from '../models/Contact.model';
import { successResponse, errorResponse } from '../utils/response.utils';
import { sendContactNotification, sendContactReply } from '../utils/email.utils';
import { AuthRequest, QueryParams } from '../types';

export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  
  const contactData = {
    name,
    email,
    subject,
    message,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  };

  const contact = await Contact.create(contactData);

  // Send notification email (optional, handle errors gracefully)
  try {
    await sendContactNotification(contact);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }

  successResponse(res, { id: contact._id }, 'Contact form submitted successfully', 201);
});

export const getAllContacts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    page = 1,
    limit = 10,
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  }: QueryParams = req.query;

  const query: any = {};
  
  if (status) {
    query.status = status;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const [contacts, total] = await Promise.all([
    Contact.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Contact.countDocuments(query)
  ]);

  const pagination = {
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    total,
    limit: Number(limit)
  };

  successResponse(res, contacts, 'Contacts retrieved successfully', 200, pagination);
});

export const getContactById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return errorResponse(res, 'Contact not found', 404);
  }

  // Mark as read if it's new
  if (contact.status === 'new') {
    contact.status = 'read';
    await contact.save();
  }

  successResponse(res, contact, 'Contact retrieved successfully');
});

export const replyToContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { reply } = req.body;
  
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    return errorResponse(res, 'Contact not found', 404);
  }

  contact.reply = reply;
  contact.status = 'replied';
  contact.repliedAt = new Date();
  await contact.save();

  // Send reply email
  try {
    await sendContactReply(contact, reply);
  } catch (error) {
    console.error('Failed to send reply email:', error);
    return errorResponse(res, 'Reply saved but failed to send email', 500);
  }

  successResponse(res, contact, 'Reply sent successfully');
});

export const updateContactStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  
  if (!['new', 'read', 'replied', 'archived'].includes(status)) {
    return errorResponse(res, 'Invalid status value', 400);
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    return errorResponse(res, 'Contact not found', 404);
  }

  successResponse(res, contact, 'Contact status updated successfully');
});

export const deleteContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return errorResponse(res, 'Contact not found', 404);
  }

  successResponse(res, null, 'Contact deleted successfully');
});