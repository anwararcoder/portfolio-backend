# 📧 **Email Setup Guide for Portfolio Backend**

## 🚨 **Current Issue: Email Not Working**

The email functionality is not working because the required environment variables are not configured.

## 🔧 **How to Fix Email Functionality**

### **Step 1: Create .env File**

Create a `.env` file in your project root with the following email configuration:

```env
# Email Configuration (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

### **Step 2: Gmail App Password Setup**

If using Gmail, you need to create an **App Password**:

1. **Enable 2-Factor Authentication** on your Google account
2. **Go to Google Account Settings** → Security
3. **Generate App Password** for "Mail"
4. **Use the generated password** as `SMTP_PASS`

**⚠️ Important:** Don't use your regular Gmail password!

### **Step 3: Alternative Email Providers**

#### **Outlook/Hotmail**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### **Yahoo Mail**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

#### **Custom SMTP Server**
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## 🧪 **Testing Email Functionality**

### **Test 1: Check Email Configuration**
```bash
GET http://localhost:5000/api/contact/test-email
```

This will test if your SMTP configuration is working.

### **Test 2: Submit Contact Form**
```bash
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Email Test",
  "message": "This is a test message to verify email functionality."
}
```

### **Test 3: Check Server Logs**
Look for these log messages:
- ✅ `Email transporter configured successfully`
- ✅ `Email sent successfully: [message-id]`
- ❌ `Missing email configuration: SMTP_HOST, SMTP_USER, SMTP_PASS`

## 🔍 **Troubleshooting Common Issues**

### **Issue 1: "Missing email configuration"**
**Solution:** Create `.env` file with proper SMTP settings

### **Issue 2: "Authentication failed"**
**Solution:** 
- Check username/password
- Use App Password for Gmail
- Verify 2FA is enabled

### **Issue 3: "Connection timeout"**
**Solution:**
- Check firewall settings
- Verify SMTP host and port
- Try different ports (587, 465, 25)

### **Issue 4: "TLS/SSL error"**
**Solution:**
- Use port 587 for STARTTLS
- Use port 465 for SSL
- Check `secure: false` setting

## 📋 **Complete .env Template**

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
```

## 🚀 **Quick Fix Steps**

1. **Create `.env` file** in project root
2. **Add email configuration** (copy from template above)
3. **Set your actual email credentials**
4. **Restart the server**
5. **Test with** `GET /api/contact/test-email`

## ✅ **Verification Checklist**

- [ ] `.env` file created
- [ ] SMTP_HOST set correctly
- [ ] SMTP_USER set to your email
- [ ] SMTP_PASS set to app password
- [ ] ADMIN_EMAIL set for notifications
- [ ] Server restarted after changes
- [ ] Email test endpoint working
- [ ] Contact form sends emails

## 🆘 **Still Having Issues?**

1. **Check server logs** for specific error messages
2. **Verify email credentials** are correct
3. **Test SMTP settings** with email client
4. **Check firewall/network** restrictions
5. **Try different email provider** if issues persist

---

**After fixing, your contact form will:**
- ✅ Send notification emails to admin
- ✅ Send reply emails to users
- ✅ Handle errors gracefully
- ✅ Log all email activities
