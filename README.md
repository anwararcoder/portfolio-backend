# 🚀 Portfolio Backend API

A comprehensive portfolio backend API built with Express.js, MongoDB, and TypeScript.

## ✨ Features

- **🔐 Authentication & Authorization** - JWT-based auth system
- **📁 File Upload** - Support for project images and user avatars
- **📧 Email Integration** - Contact form notifications and replies
- **🛡️ Security** - Rate limiting, CORS, Helmet security headers
- **📊 Database** - MongoDB with Mongoose ODM
- **🔄 API Endpoints** - RESTful API for portfolio management
- **📱 Modern Architecture** - TypeScript, ES6+, async/await

## 🏗️ Architecture

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
└── app.ts           # Main application file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfoilo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/portfolio

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=7d

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000

   # Email Configuration (Gmail example)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_EMAIL=admin@yourdomain.com

   # File Upload
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=uploads

   # Security
   BCRYPT_ROUNDS=12

   # Logging
   LOG_LEVEL=info

   # API Version
   API_VERSION=v1

   # Pagination Defaults
   DEFAULT_PAGE_SIZE=10
   MAX_PAGE_SIZE=100
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Projects
- `GET /api/projects` - Get all projects (with pagination)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Experience
- `GET /api/experience` - Get all experience
- `GET /api/experience/:id` - Get experience by ID
- `POST /api/experience` - Create new experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/:id` - Get contact by ID
- `PUT /api/contact/:id/reply` - Reply to contact
- `PUT /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Health Check
- `GET /api/health` - Server health status

## 🚀 **Complete API Usage Guide**

### **Base URL**
```
http://localhost:5000/api
```

### **Authentication Flow**

#### **1. Register New User**
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### **2. Login User**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### **3. Use JWT Token**
For authenticated requests, include the token:
```bash
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### **Projects API**

#### **Get All Projects with Filters**
```bash
GET /projects?page=1&limit=10&featured=true&category=web-application&search=react&status=active&sortBy=createdAt&sortOrder=desc
```

#### **Create New Project**
```bash
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "Full-stack e-commerce platform built with React and Node.js",
  "shortDescription": "Modern e-commerce platform",
  "technologies": ["React", "Node.js", "MongoDB", "Express"],
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "liveUrl": "https://ecommerce-demo.com",
  "githubUrl": "https://github.com/username/ecommerce",
  "featured": true,
  "status": "active",
  "category": "web-application",
  "startDate": "2024-01-01",
  "endDate": "2024-06-01"
}
```

### **Skills API**

#### **Get Skills with Filters**
```bash
GET /skills?category=frontend&featured=true&sortBy=proficiency&sortOrder=desc
```

#### **Create New Skill**
```bash
POST /skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Vue.js",
  "category": "frontend",
  "proficiency": 75,
  "description": "Progressive JavaScript framework for building user interfaces",
  "yearsOfExperience": 2,
  "featured": false
}
```

### **Experience API**

#### **Create New Experience**
```bash
POST /experience
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "startDate": "2022-01-01",
  "current": true,
  "description": "Leading development of scalable web applications",
  "responsibilities": [
    "Architect and develop high-performance web applications",
    "Mentor junior developers",
    "Conduct code reviews"
  ],
  "technologies": ["React", "Node.js", "TypeScript", "AWS"],
  "achievements": [
    "Reduced application load time by 40%",
    "Implemented CI/CD pipeline reducing deployment time by 60%"
  ],
  "type": "full-time"
}
```

### **Contact API**

#### **Submit Contact Form**
```bash
POST /contact
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@email.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project collaboration!"
}
```

### **Testing in Postman**

1. **Import Collection**: Download `Portfolio_API_Postman_Collection.json`
2. **Set Environment**: Create environment with variables:
   - `base_url`: `http://localhost:5000/api`
   - `auth_token`: Your JWT token
   - `project_id`: Project ID for testing
   - `skill_id`: Skill ID for testing
3. **Test Flow**: Health Check → Register → Login → Test CRUD operations

### **Response Format**

All APIs return consistent responses:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### **Frontend Integration Example**

```javascript
// Get featured projects
const getFeaturedProjects = async () => {
  const response = await fetch('http://localhost:5000/api/projects?featured=true');
  const data = await response.json();
  return data.data;
};

// Create project with authentication
const createProject = async (projectData, token) => {
  const response = await fetch('http://localhost:5000/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  return response.json();
};
```

## 📊 **Complete Model Fields Reference**

### **User Model Fields**
```typescript
{
  name: string,                    // User's full name
  email: string,                   // Unique email address
  password: string,                // Hashed password
  bio: string,                     // User biography
  title: string,                   // Professional title
  location: string,                // Geographic location
  website: string,                 // Personal website URL
  avatar: string,                  // Profile picture URL
  socialLinks: {
    github: string,                // GitHub profile URL
    linkedin: string,              // LinkedIn profile URL
    twitter: string,               // Twitter profile URL
    instagram: string,             // Instagram profile URL
    facebook: string,              // Facebook profile URL
    youtube: string,               // YouTube channel URL
    portfolio: string              // Portfolio website URL
  },
  skills: [ObjectId],              // Array of skill IDs
  projects: [ObjectId],            // Array of project IDs
  experience: [ObjectId],          // Array of experience IDs
  isAdmin: boolean,                // Admin privileges flag
  isActive: boolean,               // Account status
  emailVerified: boolean,          // Email verification status
  lastLogin: Date,                 // Last login timestamp
  preferences: {
    theme: string,                 // UI theme preference
    notifications: boolean,        // Email notification settings
    privacy: string                // Privacy settings
  }
}
```

### **Project Model Fields**
```typescript
{
  title: string,                   // Project title
  description: string,             // Detailed project description
  shortDescription: string,        // Brief project summary
  technologies: [string],          // Array of technologies used
  images: [string],                // Array of project image URLs
  liveUrl: string,                 // Live project URL
  githubUrl: string,               // GitHub repository URL
  demoUrl: string,                 // Demo video URL
  featured: boolean,               // Featured project flag
  status: string,                  // Project status (active/archived/in-progress)
  category: string,                // Project category
  tags: [string],                  // Array of project tags
  startDate: Date,                 // Project start date
  endDate: Date,                   // Project end date
  duration: string,                // Project duration
  teamSize: number,                // Number of team members
  role: string,                    // Your role in the project
  challenges: [string],            // Array of challenges faced
  solutions: [string],             // Array of solutions implemented
  results: [string],               // Array of project results
  metrics: {
    users: number,                 // Number of users
    performance: string,           // Performance metrics
    uptime: number                 // Uptime percentage
  },
  testimonials: [{
    name: string,                  // Client/customer name
    role: string,                  // Client role/company
    comment: string,               // Testimonial text
    rating: number                 // Rating (1-5)
  }],
  budget: {
    amount: number,                // Project budget
    currency: string               // Currency type
  },
  client: {
    name: string,                  // Client name
    company: string,               // Client company
    industry: string               // Client industry
  }
}
```

### **Skill Model Fields**
```typescript
{
  name: string,                    // Skill name
  category: string,                // Skill category (frontend/backend/database/tools/other)
  proficiency: number,             // Proficiency level (0-100)
  description: string,             // Skill description
  yearsOfExperience: number,       // Years of experience
  featured: boolean,               // Featured skill flag
  icon: string,                    // Skill icon URL
  color: string,                   // Skill color theme
  level: string,                   // Skill level (beginner/intermediate/advanced/expert)
  certifications: [{
    name: string,                  // Certification name
    issuer: string,                // Issuing organization
    date: Date,                    // Certification date
    expiryDate: Date,              // Expiry date
    credentialId: string,          // Credential ID
    url: string                    // Verification URL
  }],
  projects: [ObjectId],            // Array of project IDs using this skill
  relatedSkills: [ObjectId],       // Array of related skill IDs
  learningPath: [{
    title: string,                 // Learning step title
    description: string,           // Learning step description
    resources: [string],           // Learning resources
    estimatedTime: string          // Estimated time to complete
  }],
  marketDemand: {
    demand: string,                // Market demand level
    salary: {
      min: number,                 // Minimum salary
      max: number,                 // Maximum salary
      currency: string             // Currency type
    }
  }
}
```

### **Experience Model Fields**
```typescript
{
  title: string,                   // Job title
  company: string,                 // Company name
  location: string,                // Job location
  startDate: Date,                 // Employment start date
  endDate: Date,                   // Employment end date
  current: boolean,                // Currently employed flag
  description: string,             // Job description
  responsibilities: [string],      // Array of job responsibilities
  technologies: [string],          // Array of technologies used
  achievements: [string],          // Array of achievements
  type: string,                    // Employment type (full-time/part-time/contract/freelance)
  industry: string,                // Industry sector
  companySize: string,             // Company size
  reportingTo: string,             // Manager/supervisor
  teamSize: number,                // Team size managed
  salary: {
    amount: number,                // Salary amount
    currency: string,              // Currency type
    period: string                 // Payment period
  },
  benefits: [string],              // Array of benefits
  reasonForLeaving: string,        // Reason for leaving
  references: [{
    name: string,                  // Reference name
    title: string,                  // Reference title
    company: string,               // Reference company
    email: string,                 // Reference email
    phone: string                  // Reference phone
  }],
  projects: [{
    name: string,                  // Project name
    description: string,           // Project description
    role: string,                  // Your role
    technologies: [string],        // Technologies used
    outcome: string                // Project outcome
  }]
}
```

### **Contact Model Fields**
```typescript
{
  name: string,                    // Contact person name
  email: string,                   // Contact email address
  subject: string,                 // Contact subject
  message: string,                 // Contact message
  phone: string,                   // Contact phone number
  company: string,                 // Company name
  website: string,                 // Company website
  industry: string,                // Industry sector
  budget: {
    amount: number,                // Project budget
    currency: string               // Currency type
  },
  timeline: string,                // Project timeline
  projectType: string,             // Type of project
  urgency: string,                 // Urgency level
  status: string,                  // Contact status (new/replied/archived)
  priority: string,                // Priority level
  source: string,                  // Contact source (website/referral/social)
  tags: [string],                  // Array of tags
  assignedTo: ObjectId,            // Assigned admin user ID
  reply: {
    message: string,               // Reply message
    adminId: ObjectId,             // Admin who replied
    replyDate: Date,               // Reply date
    attachments: [string]          // Reply attachments
  },
  followUp: {
    scheduled: Date,               // Follow-up scheduled date
    notes: string,                 // Follow-up notes
    completed: boolean             // Follow-up completed flag
  },
  interactions: [{
    type: string,                  // Interaction type
    message: string,               // Interaction message
    adminId: ObjectId,             // Admin who interacted
    date: Date                     // Interaction date
  }]
}
```

### **Query Parameters for All Models**

#### **Projects Query Parameters**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `featured`: Filter featured projects (true/false)
- `category`: Filter by category
- `search`: Search in title, description, technologies
- `status`: Filter by status (active/archived/in-progress)
- `sortBy`: Sort field (createdAt, title, startDate, endDate)
- `sortOrder`: Sort direction (asc/desc)
- `technologies`: Filter by specific technologies
- `startDate`: Filter by start date range
- `endDate`: Filter by end date range

#### **Skills Query Parameters**
- `category`: frontend, backend, database, tools, other
- `featured`: Filter featured skills
- `sortBy`: name, proficiency, yearsOfExperience, createdAt
- `sortOrder`: asc/desc
- `minProficiency`: Minimum proficiency level
- `maxProficiency`: Maximum proficiency level
- `search`: Search in name and description

#### **Experience Query Parameters**
- `page`: Page number
- `limit`: Items per page
- `sortBy`: startDate, endDate, title, company
- `sortOrder`: asc/desc
- `current`: Filter current positions
- `company`: Filter by company name
- `type`: Filter by employment type
- `industry`: Filter by industry

#### **Contact Query Parameters**
- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status
- `priority`: Filter by priority
- `assignedTo`: Filter by assigned admin
- `dateRange`: Filter by date range
- `search`: Search in name, email, subject, message

## 🎯 **How to Use All Fields in Practice**

### **Creating a Comprehensive Project**
```bash
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "AI-Powered Task Manager",
  "description": "An intelligent task management application that uses machine learning to prioritize tasks, suggest optimal scheduling, and provide productivity insights.",
  "shortDescription": "Smart task manager with AI capabilities",
  "technologies": ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "Redis"],
  "images": [
    "https://example.com/dashboard.jpg",
    "https://example.com/mobile-view.jpg",
    "https://example.com/analytics.jpg"
  ],
  "liveUrl": "https://smart-task-manager.com",
  "githubUrl": "https://github.com/username/ai-task-manager",
  "demoUrl": "https://demo.smart-task-manager.com",
  "featured": true,
  "status": "active",
  "category": "web-application",
  "tags": ["ai", "productivity", "machine-learning", "task-management"],
  "startDate": "2024-01-01",
  "endDate": "2024-08-01",
  "duration": "8 months",
  "teamSize": 4,
  "role": "Full Stack Developer & AI Engineer",
  "challenges": [
    "Implementing real-time AI recommendations",
    "Optimizing ML model performance",
    "Handling large-scale data processing"
  ],
  "solutions": [
    "Used WebSocket for real-time updates",
    "Implemented model quantization for performance",
    "Utilized Redis for caching and queue management"
  ],
  "results": [
    "Increased user productivity by 45%",
    "Reduced task completion time by 30%",
    "Achieved 95% user satisfaction rating"
  ],
  "metrics": {
    "users": 5000,
    "performance": "1.2s average load time",
    "uptime": 99.8
  },
  "testimonials": [
    {
      "name": "Sarah Johnson",
      "role": "Product Manager",
      "company": "Productivity Corp",
      "comment": "This tool has revolutionized how our team manages projects!",
      "rating": 5
    }
  ],
  "budget": {
    "amount": 35000,
    "currency": "USD"
  },
  "client": {
    "name": "Michael Chen",
    "company": "Innovation Labs",
    "industry": "Technology"
  }
}
```

### **Creating a Detailed Skill Profile**
```bash
POST /api/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React with TypeScript",
  "category": "frontend",
  "proficiency": 90,
  "description": "Expert-level React development with TypeScript. Experience with React 18, hooks, context, custom hooks, and advanced patterns. Strong understanding of component architecture and state management.",
  "yearsOfExperience": 4,
  "featured": true,
  "icon": "https://example.com/react-ts-icon.svg",
  "color": "#61dafb",
  "level": "expert",
  "certifications": [
    {
      "name": "React Advanced Certification",
      "issuer": "Meta",
      "date": "2023-03-15",
      "credentialId": "REACT-ADV-2023-001",
      "url": "https://meta.com/cert/REACT-ADV-2023-001"
    }
  ],
  "learningPath": [
    {
      "title": "React Server Components",
      "description": "Master React 18 Server Components and streaming",
      "resources": ["React docs", "Next.js 13 course", "Server Components workshop"],
      "estimatedTime": "2 months"
    }
  ],
  "marketDemand": {
    "demand": "very high",
    "salary": {
      "min": 80000,
      "max": 150000,
      "currency": "USD"
    }
  }
}
```

### **Creating a Comprehensive Experience Entry**
```bash
POST /api/experience
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Lead Software Engineer",
  "company": "TechInnovate Solutions",
  "location": "Austin, TX",
  "startDate": "2021-06-01",
  "current": true,
  "description": "Leading a team of 8 developers in building enterprise-scale applications. Responsible for technical architecture, code quality, and team mentorship. Driving innovation through modern development practices.",
  "responsibilities": [
    "Lead technical architecture and design decisions",
    "Mentor junior and mid-level developers",
    "Implement CI/CD pipelines and DevOps practices",
    "Collaborate with product and design teams",
    "Conduct technical interviews and hiring",
    "Define coding standards and best practices"
  ],
  "technologies": ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes", "GraphQL"],
  "achievements": [
    "Reduced deployment time from 2 hours to 15 minutes",
    "Improved code quality score from 75% to 92%",
    "Led successful migration of legacy system to microservices",
    "Mentored 3 developers who were promoted to senior roles"
  ],
  "type": "full-time",
  "industry": "Financial Technology",
  "companySize": "1000-5000 employees",
  "reportingTo": "VP of Engineering",
  "teamSize": 8,
  "salary": {
    "amount": 140000,
    "currency": "USD",
    "period": "yearly"
  },
  "benefits": [
    "Health insurance",
    "401k with 6% match",
    "Stock options",
    "Remote work flexibility",
    "Professional development budget"
  ],
  "projects": [
    {
      "name": "Digital Banking Platform",
      "description": "Complete redesign of customer banking experience",
      "role": "Technical Lead",
      "technologies": ["React", "Node.js", "PostgreSQL", "Redis"],
      "outcome": "Increased customer engagement by 60%"
    }
  ]
}
```

### **Submitting a Detailed Contact Form**
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "Emily Rodriguez",
  "email": "emily.rodriguez@startupco.com",
  "subject": "Full-Stack Development Partnership",
  "message": "We're looking for a senior developer to help us build a revolutionary SaaS platform. Your portfolio shows exactly the kind of expertise we need. We'd love to discuss a potential long-term partnership.",
  "phone": "+1-555-9876",
  "company": "StartupCo",
  "website": "https://startupco.com",
  "industry": "SaaS",
  "budget": {
    "amount": 50000,
    "currency": "USD"
  },
  "timeline": "6-8 months",
  "projectType": "SaaS Platform",
  "urgency": "high",
  "priority": "critical",
  "source": "portfolio website",
  "tags": ["saas", "full-stack", "long-term", "partnership"]
}
```

## 🔧 **Advanced Query Examples**

### **Complex Project Filtering**
```bash
# Get featured projects with specific technologies, sorted by start date
GET /api/projects?featured=true&technologies=React&technologies=Node.js&status=active&sortBy=startDate&sortOrder=desc&limit=20

# Search projects with pagination and category filter
GET /api/projects?search=ecommerce&category=web-application&page=2&limit=15&sortBy=createdAt&sortOrder=desc
```

### **Advanced Skills Filtering**
```bash
# Get high-proficiency frontend skills
GET /api/skills?category=frontend&minProficiency=80&sortBy=proficiency&sortOrder=desc

# Search skills by name or description
GET /api/skills?search=javascript&featured=true&sortBy=yearsOfExperience&sortOrder=desc
```

### **Experience with Multiple Filters**
```bash
# Get current positions in specific industry
GET /api/experience?current=true&industry=Technology&sortBy=startDate&sortOrder=desc

# Filter by employment type and company size
GET /api/experience?type=full-time&companySize=1000-5000&sortBy=title&sortOrder=asc
```

## 🔧 Configuration

The application uses a centralized configuration system in `src/config/environment.ts`. Key configuration options:

- **Database**: MongoDB connection string and options
- **Security**: JWT secrets, rate limiting, CORS
- **Email**: SMTP settings for notifications
- **File Upload**: Size limits and storage paths
- **Pagination**: Default page sizes and limits

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Prevent abuse and DDoS attacks
- **CORS Protection** - Control cross-origin requests
- **Helmet Security** - Security headers and CSP
- **Input Validation** - Request data validation
- **Password Hashing** - Bcrypt with configurable rounds

## 📁 File Structure

```
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── environment.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── experience.controller.ts
│   │   ├── project.controller.ts
│   │   └── skill.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/
│   │   ├── Contact.model.ts
│   │   ├── Experience.model.ts
│   │   ├── Project.model.ts
│   │   ├── Skill.model.ts
│   │   └── User.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── experience.routes.ts
│   │   ├── project.routes.ts
│   │   └── skill.routes.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   ├── email.utils.ts
│   │   ├── jwt.utils.ts
│   │   └── response.utils.ts
│   └── app.ts
├── uploads/         # File upload directory
├── .env             # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all production environment variables are properly set:
- Strong JWT secret
- Production MongoDB URI
- SMTP credentials
- Proper CORS origins

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api/health`
- Review the error logs

---

**Happy Coding! 🎉**
