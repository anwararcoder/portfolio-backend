"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = require("./middleware/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const skill_routes_1 = __importDefault(require("./routes/skill.routes"));
const experience_routes_1 = __importDefault(require("./routes/experience.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    message: {
        error: "Too many requests from this IP, please try again later.",
        retryAfter: Math.ceil(parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000") / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api", limiter);
// General middleware
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Static files (available under both root and /api for convenience)
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Health check with detailed info
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform,
    });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/projects", project_routes_1.default);
app.use("/api/skills", skill_routes_1.default);
app.use("/api/experience", experience_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        timestamp: new Date().toISOString(),
    });
});
// Error handling middleware
app.use(error_middleware_1.errorHandler);
// Database connection with retry logic
const connectDB = async (retries = 5) => {
    try {
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
        await mongoose_1.default.connect(mongoUri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
        if (retries > 0) {
            console.log(`❌ MongoDB connection failed, retrying... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectDB(retries - 1);
        }
        console.error("❌ MongoDB connection failed after all retries:", error);
        process.exit(1);
    }
};
// Graceful shutdown
const gracefulShutdown = async (signal) => {
    console.log(`\n🔄 Received ${signal}. Starting graceful shutdown...`);
    try {
        // Close database connection
        await mongoose_1.default.connection.close();
        console.log("✅ Database connection closed");
        // Close server
        if (server) {
            server.close(() => {
                console.log("✅ Server closed");
                process.exit(0);
            });
        }
    }
    catch (error) {
        console.error("❌ Error during graceful shutdown:", error);
        process.exit(1);
    }
};
// Handle different shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
const PORT = process.env.PORT || 5000;
let server;
if (process.env.NODE_ENV !== "test") {
    connectDB().then(() => {
        server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
        });
    });
}
exports.default = app;
//# sourceMappingURL=app.js.map