#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📧 Portfolio Backend Email Setup');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('✅ .env file already exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check email configuration
  const hasSMTP = envContent.includes('SMTP_HOST') && 
                  envContent.includes('SMTP_USER') && 
                  envContent.includes('SMTP_PASS');
  
  if (hasSMTP) {
    console.log('✅ Email configuration found in .env');
    console.log('\n📋 Current email settings:');
    
    const lines = envContent.split('\n');
    lines.forEach(line => {
      if (line.startsWith('SMTP_') || line.startsWith('ADMIN_EMAIL')) {
        const [key, value] = line.split('=');
        if (key && value) {
          const maskedValue = key.includes('PASS') ? '***' : value;
          console.log(`   ${key}=${maskedValue}`);
        }
      }
    });
  } else {
    console.log('❌ Email configuration missing from .env');
    console.log('\n🔧 Adding email configuration...');
    addEmailConfig(envContent);
  }
} else {
  console.log('❌ .env file not found');
  console.log('\n🔧 Creating .env file with email configuration...');
  createEnvFile();
}

function createEnvFile() {
  const envContent = `# Server Configuration
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

# Email Configuration (Gmail)
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
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully');
  console.log('\n📝 Next steps:');
  console.log('1. Edit .env file with your actual email credentials');
  console.log('2. For Gmail: Use App Password (not regular password)');
  console.log('3. Restart your server');
  console.log('4. Test with: GET /api/contact/test-email');
}

function addEmailConfig(existingContent) {
  const emailConfig = `

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com`;

  const newContent = existingContent + emailConfig;
  fs.writeFileSync(envPath, newContent);
  console.log('✅ Email configuration added to .env');
  console.log('\n📝 Next steps:');
  console.log('1. Edit .env file with your actual email credentials');
  console.log('2. For Gmail: Use App Password (not regular password)');
  console.log('3. Restart your server');
  console.log('4. Test with: GET /api/contact/test-email');
}

console.log('\n📚 For detailed setup instructions, see: EMAIL_SETUP_GUIDE.md');
console.log('🔧 For Gmail App Password setup, see: https://support.google.com/accounts/answer/185833');
