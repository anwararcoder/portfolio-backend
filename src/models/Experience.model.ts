import mongoose, { Schema } from 'mongoose';
import { IExperience } from '../types';

const experienceSchema = new Schema<IExperience>({
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
      validator: function(this: any, v: Date) {
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

export default mongoose.model<IExperience>('Experience', experienceSchema);
