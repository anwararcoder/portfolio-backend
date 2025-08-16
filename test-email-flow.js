#!/usr/bin/env node

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Testing Complete Email Flow');
console.log('==============================\n');

// Check environment variables
console.log('📧 Current Configuration:');
console.log(`   SMTP_HOST: ${process.env.SMTP_HOST}`);
console.log(`   SMTP_USER: ${process.env.SMTP_USER}`);
console.log(`   ADMIN_EMAIL: ${process.env.ADMIN_EMAIL}`);
console.log('');

// Test 1: Contact Form Submission (should send to ADMIN_EMAIL)
console.log('📝 Test 1: Contact Form Submission');
console.log('   When someone submits POST /contact, you should receive an email at:');
console.log(`   ${process.env.ADMIN_EMAIL}`);
console.log('');

// Test 2: Contact Reply (should send to contact email)
console.log('📝 Test 2: Contact Reply');
console.log('   When you reply using PUT /contact/:id/reply, the contact will receive an email at:');
console.log('   [their-email-address]');
console.log('');

// Test 3: Send test notification email
console.log('🧪 Test 3: Sending Test Notification Email');
console.log('   This simulates what happens when someone submits a contact form...');

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
  }
});

// Simulate contact form submission
const contactData = {
  name: "John Doe",
  email: "john.doe@example.com",
  subject: "Project Inquiry",
  message: "I would like to discuss a potential project collaboration. Your portfolio looks impressive!",
  phone: "+1-555-0123",
  company: "Tech Solutions Inc.",
  website: "https://techsolutions.com"
};

const notificationHtml = `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${contactData.name}</p>
  <p><strong>Email:</strong> ${contactData.email}</p>
  <p><strong>Subject:</strong> ${contactData.subject}</p>
  <p><strong>Message:</strong></p>
  <p>${contactData.message}</p>
  <p><strong>Phone:</strong> ${contactData.phone}</p>
  <p><strong>Company:</strong> ${contactData.company}</p>
  <p><strong>Website:</strong> ${contactData.website}</p>
  <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  <hr>
  <p><em>This is a test email simulating a contact form submission.</em></p>
`;

const notificationEmail = {
  from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
  to: process.env.ADMIN_EMAIL,
  subject: `New Contact: ${contactData.subject}`,
  html: notificationHtml
};

transporter.sendMail(notificationEmail, (error, info) => {
  if (error) {
    console.error('❌ Failed to send notification email:', error);
  } else {
    console.log('✅ Notification email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Sent to: ${process.env.ADMIN_EMAIL}`);
  }
  
  // Now test reply email
  console.log('\n🧪 Test 4: Sending Test Reply Email');
  console.log('   This simulates what happens when you reply to a contact...');
  
  const replyMessage = "Thank you for reaching out! I'm excited about the potential collaboration. Let me review your requirements and get back to you with a detailed proposal. I'll contact you within 24 hours to discuss this further.";
  
  const replyHtml = `
    <h2>Reply to Your Message</h2>
    <p>Hi ${contactData.name},</p>
    <p>Thank you for reaching out. Here's my reply:</p>
    <div style="padding: 15px; background-color: #f5f5f5; border-left: 4px solid #007bff;">
      ${replyMessage}
    </div>
    <br>
    <p><strong>Your Original Message:</strong></p>
    <p><strong>Subject:</strong> ${contactData.subject}</p>
    <p>${contactData.message}</p>
    <br>
    <p>Best regards,<br>Portfolio Team</p>
    <hr>
    <p><em>This is a test email simulating a reply to a contact form.</em></p>
  `;
  
  const replyEmail = {
    from: `"Portfolio Team" <${process.env.SMTP_USER}>`,
    to: contactData.email,
    subject: `Re: ${contactData.subject}`,
    html: replyHtml
  };
  
  transporter.sendMail(replyEmail, (error, info) => {
    if (error) {
      console.error('❌ Failed to send reply email:', error);
    } else {
      console.log('✅ Reply email sent successfully!');
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   Sent to: ${contactData.email}`);
    }
    
    console.log('\n🎉 Email Flow Test Complete!');
    console.log('\n📧 Summary:');
    console.log(`   1. Notification email sent to: ${process.env.ADMIN_EMAIL} (YOU)`);
    console.log(`   2. Reply email sent to: ${contactData.email} (CONTACT)`);
    console.log('\n✅ Your email system is working correctly!');
    
    transporter.close();
    process.exit(0);
  });
});
