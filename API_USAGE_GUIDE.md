# 📚 Portfolio Backend API Usage Guide

## 🚀 **Quick Start**

### **Base URL**
```
http://localhost:5000/api
```

### **Health Check**
Test if the server is running:
```bash
GET http://localhost:5000/api/health
```

## 🔐 **Authentication Flow**

### **1. Register a New User**
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

### **2. Login User**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### **3. Use the Token**
For authenticated requests, include the token in the Authorization header:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📁 **Projects API**

### **Get All Projects**
```bash
GET /projects?page=1&limit=10&featured=true&category=web-application
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `featured`: Filter featured projects (true/false)
- `category`: Filter by category
- `search`: Search in title, description, technologies
- `status`: Filter by status (active/archived/in-progress)
- `sortBy`: Sort field (createdAt, title, startDate)
- `sortOrder`: Sort direction (asc/desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "E-commerce Platform",
      "description": "Full-stack e-commerce platform...",
      "technologies": ["React", "Node.js", "MongoDB"],
      "featured": true,
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "pages": 5,
    "total": 50,
    "limit": 10
  }
}
```

### **Create New Project**
```bash
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Project",
  "description": "Project description",
  "shortDescription": "Short description",
  "technologies": ["React", "Node.js"],
  "images": ["https://example.com/image.jpg"],
  "liveUrl": "https://project-demo.com",
  "githubUrl": "https://github.com/username/project",
  "featured": true,
  "status": "active",
  "category": "web-application",
  "startDate": "2024-01-01",
  "endDate": "2024-06-01"
}
```

### **Update Project**
```bash
PUT /projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Project Title",
  "description": "Updated description"
}
```

### **Delete Project**
```bash
DELETE /projects/:id
Authorization: Bearer <token>
```

## 🛠️ **Skills API**

### **Get All Skills**
```bash
GET /skills?category=frontend&featured=true&sortBy=proficiency&sortOrder=desc
```

**Query Parameters:**
- `category`: frontend, backend, database, tools, other
- `featured`: Filter featured skills
- `sortBy`: name, proficiency, yearsOfExperience
- `sortOrder`: asc/desc

### **Create New Skill**
```bash
POST /skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Vue.js",
  "category": "frontend",
  "proficiency": 75,
  "description": "Progressive JavaScript framework",
  "yearsOfExperience": 2,
  "featured": false
}
```

## 💼 **Experience API**

### **Get All Experience**
```bash
GET /experience?page=1&limit=5&sortBy=startDate&sortOrder=desc
```

### **Create New Experience**
```bash
POST /experience
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Engineer",
  "company": "Tech Company",
  "location": "Remote",
  "startDate": "2023-01-01",
  "current": true,
  "description": "Developing web applications",
  "responsibilities": ["Code development", "Code review"],
  "technologies": ["JavaScript", "React"],
  "type": "full-time"
}
```

## 📧 **Contact API**

### **Submit Contact Form**
```bash
POST /contact
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@email.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project collaboration."
}
```

### **Get All Contacts (Admin Only)**
```bash
GET /contact?page=1&limit=10&status=new
Authorization: Bearer <token>
```

## 🧪 **Testing in Postman**

### **Step 1: Import Collection**
1. Download `Portfolio_API_Postman_Collection.json`
2. Open Postman
3. Click "Import" → Select the file
4. The collection will appear in your workspace

### **Step 2: Set Environment Variables**
1. Click the "Environment" tab
2. Create a new environment called "Portfolio Local"
3. Add these variables:
   - `base_url`: `http://localhost:5000/api`
   - `auth_token`: Leave empty for now
   - `project_id`: Leave empty for now
   - `skill_id`: Leave empty for now

### **Step 3: Test the Flow**

#### **1. Health Check**
- Run "Health Check" request
- Should return 200 with server status

#### **2. Register User**
- Run "Register User" request
- Copy the token from the response
- Set `auth_token` variable to this token

#### **3. Test Authenticated Endpoints**
- Now you can test all authenticated endpoints
- The token will automatically be included

### **Step 4: Test CRUD Operations**

#### **Create Project**
1. Run "Create Project" request
2. Copy the project ID from response
3. Set `project_id` variable to this ID

#### **Update Project**
1. Run "Update Project" request
2. The `project_id` variable will be used automatically

#### **Delete Project**
1. Run "Delete Project" request
2. Project will be deleted using the stored ID

## 🔍 **Testing with cURL**

### **Health Check**
```bash
curl http://localhost:5000/api/health
```

### **Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### **Login User**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### **Get Projects (with token)**
```bash
curl http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### **Create Project**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "featured": true,
    "status": "active",
    "category": "web-application",
    "startDate": "2024-01-01"
  }'
```

## 📊 **Response Format**

All API responses follow this format:

### **Success Response**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### **Error Response**
```json
{
  "success": false,
  "message": "Error description",
  "errors": { ... }
}
```

### **Paginated Response**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "pages": 5,
    "total": 50,
    "limit": 10
  }
}
```

## 🚨 **Common HTTP Status Codes**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔧 **Troubleshooting**

### **Server Not Running**
```bash
# Check if server is running
curl http://localhost:5000/api/health

# Start server
npm run dev
```

### **Authentication Issues**
- Ensure token is valid and not expired
- Check Authorization header format: `Bearer <token>`
- Verify user exists and is active

### **Database Issues**
- Check MongoDB connection
- Run the seeder: `npm run seed`
- Verify environment variables

### **CORS Issues**
- Check FRONTEND_URL in environment
- Ensure frontend is running on correct port

## 📱 **Frontend Integration**

### **JavaScript/Fetch Example**
```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    return data.data;
  }
  throw new Error(data.message);
};

// Get Projects
const getProjects = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/projects', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  return data.data;
};
```

### **React Hook Example**
```javascript
import { useState, useEffect } from 'react';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return { projects, loading };
};
```

---

**Happy Testing! 🎉**
