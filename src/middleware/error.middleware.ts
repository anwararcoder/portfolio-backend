import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response.utils';
import multer from 'multer';

interface CustomError extends Error {
  statusCode?: number;
  code?: number | string;
  keyValue?: any;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Multer errors (file upload)
  if (err instanceof multer.MulterError) {
    const mErr = err as multer.MulterError;
    if (mErr.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 'File too large', 400);
    }
    return errorResponse(res, `Upload error: ${mErr.message}`, 400);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return errorResponse(res, `${field} already exists`, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values((err as any).errors).map((val: any) => val.message);
    return errorResponse(res, 'Validation Error', 400, errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  return errorResponse(res, err.message || 'Internal server error', err.statusCode || 500);
};