"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmailConnection = exports.sendContactReply = exports.sendContactNotification = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const createContactEmailTemplate_1 = require("./createContactEmailTemplate");
const createReplyEmailTemplate_1 = require("./createReplyEmailTemplate");
// Ensure environment variables are loaded
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
// Validate email configuration
const validateEmailConfig = () => {
    const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
    const missing = required.filter(key => !process.env[key]);
    if (missing.length > 0) {
        console.error(`❌ Missing email configuration: ${missing.join(', ')}`);
        console.error('📧 Please set the following environment variables:');
        console.error('   SMTP_HOST=smtp.gmail.com');
        console.error('   SMTP_USER=your-email@gmail.com');
        console.error('   SMTP_PASS=your-app-password');
        console.error('   ADMIN_EMAIL=admin@yourdomain.com');
        return false;
    }
    // Log current configuration (mask password)
    console.log('📧 Email Configuration:');
    console.log(`   Host: ${process.env.SMTP_HOST}`);
    console.log(`   Port: ${process.env.SMTP_PORT}`);
    console.log(`   User: ${process.env.SMTP_USER}`);
    console.log(`   Pass: ${process.env.SMTP_PASS ? '***' : 'NOT SET'}`);
    console.log(`   Admin: ${process.env.ADMIN_EMAIL}`);
    return true;
};
// Create transporter with better error handling
const createTransporter = () => {
    if (!validateEmailConfig()) {
        return null;
    }
    try {
        console.log('🔧 Creating email transporter...');
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            },
            debug: true, // Enable debug output
            logger: true // Log to console
        });
        // Verify connection configuration
        transporter.verify((error, success) => {
            if (error) {
                const smtpError = error;
                console.error('❌ Email transporter verification failed:', error);
                console.error('🔍 Error details:', {
                    code: smtpError.code,
                    command: smtpError.command,
                    response: smtpError.response,
                    responseCode: smtpError.responseCode
                });
            }
            else {
                console.log('✅ Email transporter configured successfully');
            }
        });
        return transporter;
    }
    catch (error) {
        console.error('❌ Failed to create email transporter:', error);
        return null;
    }
};
const transporter = createTransporter();
const sendEmail = async (options) => {
    if (!transporter) {
        throw new Error('Email transporter not configured. Please check your SMTP settings.');
    }
    if (!options.to) {
        throw new Error('Recipient email address is required');
    }
    const mailOptions = {
        from: `"Portfolio" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
    };
    try {
        console.log(`📧 Sending email to: ${options.to}`);
        console.log(`📧 Subject: ${options.subject}`);
        console.log(`📧 From: ${process.env.SMTP_USER}`);
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        console.log('📧 Email details:', {
            messageId: info.messageId,
            response: info.response,
            accepted: info.accepted,
            rejected: info.rejected
        });
    }
    catch (error) {
        console.error('❌ Failed to send email:', error);
        // Log detailed error information
        if (error instanceof Error) {
            console.error('🔍 Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }
        // Check for common SMTP errors
        const smtpError = error;
        if (smtpError.code === 'EAUTH') {
            console.error('🔐 Authentication failed. Check your username and password.');
            console.error('💡 For Gmail: Make sure you\'re using an App Password, not your regular password.');
        }
        else if (smtpError.code === 'ECONNECTION') {
            console.error('🌐 Connection failed. Check your SMTP host and port.');
        }
        else if (smtpError.code === 'ETIMEDOUT') {
            console.error('⏰ Connection timeout. Check your network and firewall settings.');
        }
        throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
exports.sendEmail = sendEmail;
const sendContactNotification = async (contact) => {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (!adminEmail) {
        console.error('❌ No admin email configured for notifications');
        return;
    }
    const html = (0, createContactEmailTemplate_1.createContactEmailTemplate)(contact);
    await (0, exports.sendEmail)({
        to: adminEmail,
        subject: `New Contact: ${contact.subject}`,
        html
    });
};
exports.sendContactNotification = sendContactNotification;
const sendContactReply = async (contact, reply) => {
    const html = (0, createReplyEmailTemplate_1.createReplyEmailTemplate)(contact, reply);
    await (0, exports.sendEmail)({
        to: contact.email,
        subject: `Re: ${contact.subject}`,
        html
    });
};
exports.sendContactReply = sendContactReply;
// Test email function for debugging
const testEmailConnection = async () => {
    if (!transporter) {
        console.error('❌ Email transporter not configured');
        return false;
    }
    try {
        console.log('🧪 Testing email connection...');
        await transporter.verify();
        console.log('✅ Email connection test successful');
        return true;
    }
    catch (error) {
        console.error('❌ Email connection test failed:', error);
        // Log detailed error information
        if (error instanceof Error) {
            const smtpError = error;
            console.error('🔍 Test error details:', {
                name: error.name,
                message: error.message,
                code: smtpError.code,
                command: smtpError.command,
                response: smtpError.response
            });
        }
        return false;
    }
};
exports.testEmailConnection = testEmailConnection;
//# sourceMappingURL=email.utils.js.map