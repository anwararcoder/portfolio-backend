"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const experienceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        maxlength: [100, 'Location cannot exceed 100 characters']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        validate: {
            validator: function (v) {
                return this.current || (v && v > this.startDate);
            },
            message: 'End date must be after start date or position must be current'
        }
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    responsibilities: [{
            type: String,
            required: true
        }],
    technologies: [{
            type: String,
            required: true
        }],
    achievements: [{
            type: String
        }],
    companyLogo: {
        type: String
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: [true, 'Employment type is required']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.default = mongoose_1.default.model('Experience', experienceSchema);
//# sourceMappingURL=Experience.model.js.map