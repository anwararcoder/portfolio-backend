#!/usr/bin/env node

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing Email Configuration');
console.log('==============================\n');

// Check environment variables
console.log('📧 Environment Variables:');
console.log(`   SMTP_HOST: ${process.env.SMTP_HOST || 'NOT SET'}`);
console.log(`   SMTP_PORT: ${process.env.SMTP_PORT || 'NOT SET'}`);
console.log(`   SMTP_USER: ${process.env.SMTP_USER || 'NOT SET'}`);
console.log(`   SMTP_PASS: ${process.env.SMTP_PASS ? '***' : 'NOT SET'}`);
console.log(`   ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || 'NOT SET'}\n`);

// Validate configuration
const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.log('❌ Missing required configuration:', missing.join(', '));
  process.exit(1);
}

// Create transporter
console.log('🔧 Creating email transporter...');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true
});

// Test connection
console.log('\n🧪 Testing SMTP connection...');
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Connection test failed:', error);
    console.error('\n🔍 Error details:');
    console.error(`   Code: ${error.code}`);
    console.error(`   Command: ${error.command}`);
    console.error(`   Response: ${error.response}`);
    console.error(`   Response Code: ${error.responseCode}`);
    
    // Provide specific solutions
    if (error.code === 'EAUTH') {
      console.error('\n💡 Solution: Authentication failed');
      console.error('   - Check your username and password');
      console.error('   - For Gmail: Use App Password, not regular password');
      console.error('   - Enable 2-Factor Authentication on your Google account');
      console.error('   - Generate App Password at: https://myaccount.google.com/apppasswords');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n💡 Solution: Connection failed');
      console.error('   - Check your SMTP host and port');
      console.error('   - Verify firewall settings');
      console.error('   - Try different ports (587, 465, 25)');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('\n💡 Solution: Connection timeout');
      console.error('   - Check your network connection');
      console.error('   - Verify firewall settings');
      console.error('   - Try different SMTP servers');
    }
  } else {
    console.log('✅ Connection test successful!');
    
    // Test sending a simple email
    console.log('\n📧 Testing email sending...');
    const mailOptions = {
      from: `"Test" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: 'Email Test - Portfolio Backend',
      text: 'This is a test email to verify your SMTP configuration is working correctly.',
      html: `
        <h2>Email Test Successful! 🎉</h2>
        <p>Your email configuration is working correctly.</p>
        <p><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</p>
        <p><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</p>
        <p><strong>User:</strong> ${process.env.SMTP_USER}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email sending failed:', error);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log(`   Message ID: ${info.messageId}`);
        console.log(`   Response: ${info.response}`);
      }
      
      transporter.close();
      process.exit(0);
    });
  }
});
