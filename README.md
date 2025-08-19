## Portfolio Backend API

Express + TypeScript + MongoDB backend for portfolio content with image uploads. This README shows how to run the API and use every endpoint.

### Quick start
- Install: `npm install`
- Env file `.env` (example):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=super-secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email (optional for contact replies)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_pass
SMTP_FROM="Your Name <no-reply@example.com>"
```
- Dev: `npm run dev` (nodemon)
- Build: `npm run build`
- Start: `npm start`
- Health check: `GET /api/health`

### Base URL
- Local: `http://localhost:5000`
- Static uploads are served at: `GET /uploads/<filename>`

### Auth
Routes under `/api/auth`

- POST `/register` (multipart/form-data)
  - Fields: `name` (string, 2-50), `email` (email), `password` (>=6), `avatar` (file, optional)
  - Example (cURL):
```
curl -X POST http://localhost:5000/api/auth/register \
  -F name="John Doe" \
  -F email=john@example.com \
  -F password=secret123 \
  -F avatar=@/path/to/avatar.png
```

- POST `/login` (JSON)
```
{
  "email": "john@example.com",
  "password": "secret123"
}
```
Response includes `token`.

- GET `/profile` (Auth)
  - Header: `Authorization: Bearer <token>`

- PUT `/profile` (Auth, multipart/form-data)
  - Updatable fields: `name,bio,title,location,website,socialLinks`
  - File: `avatar` (optional)

### Projects
Routes under `/api/projects`

- GET `/` with query params:
  - `page` (number), `limit` (number), `search` (text), `category` (string), `featured` (true|false), `status` (active|archived|in-progress), `sortBy`, `sortOrder` (asc|desc)

- GET `/:id`

- POST `/` (Auth, multipart/form-data)
  - Required fields: `title` (3-100), `description` (10-2000), `technologies` (array or comma-separated), `category`, `startDate` (ISO)
  - Optional: `shortDescription`, `endDate`, `liveUrl`, `githubUrl`, `featured`, `status`
  - Files: `images` (multiple files, up to 10)
  - Example (cURL):
```
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>" \
  -F title="Project A" \
  -F description="Long description..." \
  -F technologies="react,typescript,node" \
  -F category="web" \
  -F startDate="2024-01-01" \
  -F images=@/path/one.png \
  -F images=@/path/two.jpg
```

- PUT `/:id` (Auth, multipart/form-data)
  - Same fields as POST. If you upload new `images`, they will be appended to any provided `images` array/body.

- DELETE `/:id` (Auth)

### Skills
Routes under `/api/skills`

- GET `/` with query params: `page`, `limit`, `category` (frontend|backend|database|tools|other), `featured` (true|false), `sortBy`, `sortOrder`
- GET `/:id`
- POST `/` (Auth, multipart/form-data)
  - Fields: `name` (2-50), `category` (enum), `proficiency` (1-100), optional `description`, `yearsOfExperience`, `featured`
  - File: `icon` (optional)
- PUT `/:id` (Auth, multipart/form-data)
  - Same as POST (file optional)
- DELETE `/:id` (Auth)

### Experience
Routes under `/api/experience`

- GET `/` with query params: `page`, `limit`, `sortBy` (default startDate), `sortOrder`
- GET `/:id`
- POST `/` (Auth, multipart/form-data)
  - Required fields: `title`, `company`, `location`, `startDate` (ISO), `description`, `responsibilities` (array or comma-separated), `technologies` (array or comma-separated), `type` (full-time|part-time|contract|internship)
  - Optional fields: `endDate`, `current` (bool), `achievements` (array)
  - File: `companyLogo` (optional)
- PUT `/:id` (Auth, multipart/form-data)
  - Same fields as POST (file optional)
- DELETE `/:id` (Auth)

### Contact
Routes under `/api/contact`

- POST `/` (public, JSON)
```
{
  "name": "Jane",
  "email": "jane@example.com",
  "subject": "Hello",
  "message": "I want to get in touch"
}
```
- GET `/test-email` (public) – quick SMTP connectivity check
- GET `/` (Auth) – list with `page`, `limit`, `status`, `sortBy`, `sortOrder`
- GET `/:id` (Auth)
- PUT `/:id/reply` (Auth) – JSON `{ "reply": "..." }` (sends email)
- PUT `/:id/status` (Auth) – JSON `{ "status": "new|read|replied|archived" }`
- DELETE `/:id` (Auth)

### Uploads and limits
- Allowed image types: jpeg, jpg, png, gif, webp
- Max size: `MAX_FILE_SIZE` (default 5MB)
- Uploaded file paths are returned like `/uploads/<filename>`; access via `http://localhost:5000/uploads/<filename>`

### Responses
- Success shape:
```
{
  "success": true,
  "data": { ... },
  "message": "optional",
  "pagination": { "page": 1, "pages": 3, "total": 25, "limit": 10 }
}
```
- Error shape:
```
{ "success": false, "message": "Error message", "errors": [ ... ] }
```

### Auth header
For protected routes, add: `Authorization: Bearer <token>`

### Rate limiting & CORS
- Rate limiting is applied at `/api/*` based on env settings
- CORS origin defaults to `FRONTEND_URL` or `http://localhost:3000`

### Postman collection
- Import `Portfolio_API_Postman_Collection.json` found in the repo root.

### More docs
- See `API_USAGE_GUIDE.md` and `COMPLETE_API_GUIDE_SUMMARY.md` for extended notes.


