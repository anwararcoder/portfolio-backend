"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = exports.API_VERSION = exports.LOG_LEVEL = exports.BCRYPT_ROUNDS = exports.UPLOAD_PATH = exports.MAX_FILE_SIZE = exports.ADMIN_EMAIL = exports.SMTP_PASS = exports.SMTP_USER = exports.SMTP_PORT = exports.SMTP_HOST = exports.FRONTEND_URL = exports.RATE_LIMIT_MAX_REQUESTS = exports.RATE_LIMIT_WINDOW_MS = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.MONGODB_URI = exports.PORT = exports.NODE_ENV = exports.validateConfig = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    // Server Configuration
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '5000'),
    // Database Configuration
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    // CORS Configuration
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    // Email Configuration
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
    SMTP_USER: process.env.SMTP_USER || '',
    SMTP_PASS: process.env.SMTP_PASS || '',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
    // File Upload
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
    UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads',
    // Security
    BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    // Logging
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    // API Version
    API_VERSION: process.env.API_VERSION || 'v1',
    // Pagination Defaults
    DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE || '10'),
    MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE || '100'),
};
// Validation function
const validateConfig = () => {
    const requiredFields = ['JWT_SECRET', 'MONGODB_URI'];
    for (const field of requiredFields) {
        if (!exports.config[field]) {
            throw new Error(`Missing required environment variable: ${field}`);
        }
    }
    if (exports.config.NODE_ENV === 'production' && exports.config.JWT_SECRET === 'your-super-secret-jwt-key-change-in-production') {
        throw new Error('JWT_SECRET must be changed in production environment');
    }
};
exports.validateConfig = validateConfig;
// Export individual config values for convenience
exports.NODE_ENV = exports.config.NODE_ENV, exports.PORT = exports.config.PORT, exports.MONGODB_URI = exports.config.MONGODB_URI, exports.JWT_SECRET = exports.config.JWT_SECRET, exports.JWT_EXPIRES_IN = exports.config.JWT_EXPIRES_IN, exports.RATE_LIMIT_WINDOW_MS = exports.config.RATE_LIMIT_WINDOW_MS, exports.RATE_LIMIT_MAX_REQUESTS = exports.config.RATE_LIMIT_MAX_REQUESTS, exports.FRONTEND_URL = exports.config.FRONTEND_URL, exports.SMTP_HOST = exports.config.SMTP_HOST, exports.SMTP_PORT = exports.config.SMTP_PORT, exports.SMTP_USER = exports.config.SMTP_USER, exports.SMTP_PASS = exports.config.SMTP_PASS, exports.ADMIN_EMAIL = exports.config.ADMIN_EMAIL, exports.MAX_FILE_SIZE = exports.config.MAX_FILE_SIZE, exports.UPLOAD_PATH = exports.config.UPLOAD_PATH, exports.BCRYPT_ROUNDS = exports.config.BCRYPT_ROUNDS, exports.LOG_LEVEL = exports.config.LOG_LEVEL, exports.API_VERSION = exports.config.API_VERSION, exports.DEFAULT_PAGE_SIZE = exports.config.DEFAULT_PAGE_SIZE, exports.MAX_PAGE_SIZE = exports.config.MAX_PAGE_SIZE;
//# sourceMappingURL=environment.js.map