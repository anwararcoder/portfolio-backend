"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReplyEmailTemplate = void 0;
const createReplyEmailTemplate = (contact, reply) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #2d3748; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 35px 40px; position: relative; }
    .header::after { content: ''; position: absolute; bottom: -10px; left: 0; width: 100%; height: 20px; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E") no-repeat center; background-size: cover; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 10px 0 0 0; opacity: 0.95; font-size: 18px; font-weight: 400; }
    .content { padding: 50px 40px; }
    .greeting { font-size: 20px; font-weight: 600; color: #4a5568; margin-bottom: 25px; }
    .intro { font-size: 16px; color: #718096; margin-bottom: 30px; line-height: 1.6; }
    .reply-section { background: linear-gradient(145deg, #f7fafc 0%, #edf2f7 100%); border: 1px solid #e2e8f0; border-left: 5px solid #667eea; border-radius: 12px; padding: 25px; margin: 30px 0; position: relative; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1); }
    .reply-section::before { content: '💬'; position: absolute; top: -8px; left: 15px; background: #667eea; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .reply-text { color: #2d3748; font-size: 16px; line-height: 1.8; margin: 0; white-space: pre-wrap; }
    .original-message { margin-top: 40px; padding-top: 30px; border-top: 2px solid #e2e8f0; }
    .section-title { font-size: 18px; font-weight: 600; color: #4a5568; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
    .message-details { background: #fafafa; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 15px; }
    .detail-row { margin-bottom: 12px; }
    .detail-row:last-child { margin-bottom: 0; }
    .detail-label { font-weight: 600; color: #4a5568; font-size: 14px; display: inline-block; min-width: 80px; }
    .detail-value { color: #2d3748; font-size: 15px; }
    .original-text { background: #f8f9fa; border-left: 4px solid #cbd5e0; padding: 20px; border-radius: 8px; color: #4a5568; font-style: italic; line-height: 1.6; white-space: pre-wrap; }
    .signature { margin-top: 40px; padding-top: 25px; border-top: 1px solid #e2e8f0; }
    .signature-content { color: #4a5568; font-size: 16px; line-height: 1.6; }
    .signature-name { font-weight: 600; color: #2d3748; }
    .signature-title { color: #718096; font-size: 14px; margin-top: 5px; }
    .footer { background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%); color: #cbd5e0; padding: 25px 40px; text-align: center; }
    .footer p { margin: 5px 0; font-size: 13px; line-height: 1.5; }
    .footer a { color: #90cdf4; text-decoration: none; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent); margin: 25px 0; }
    @media (max-width: 650px) { 
      body { padding: 10px; } 
      .content, .header, .footer { padding: 25px 20px; } 
      .header h1 { font-size: 28px; } 
      .greeting { font-size: 18px; }
      .reply-section { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Reply to Your Inquiry</h1>
      <p>Response from Anwar Ramadan’s Website – AR-Coder</p>
    </div>
    
    <div class="content">
      <div class="greeting">
        Hi ${contact.name},
      </div>
      
      <p class="intro">
        Thank you for contacting <strong>Anwar Ramadan’s website</strong>. We’ve carefully reviewed your inquiry and are pleased to provide you with the following response:
      </p>
      
      <div class="reply-section">
        <div class="reply-text">${reply}</div>
      </div>
      
      <div class="original-message">
        <div class="section-title">
          📝 Your Original Message
        </div>
        
        <div class="message-details">
          <div class="detail-row">
            <span class="detail-label">Subject:</span>
            <span class="detail-value">${contact.subject}</span>
          </div>
          ${contact.email ? `
          <div class="detail-row">
            <span class="detail-label">From:</span>
            <span class="detail-value">${contact.email}</span>
          </div>
          ` : ''}
          ${contact.company ? `
          <div class="detail-row">
            <span class="detail-label">Company:</span>
            <span class="detail-value">${contact.company}</span>
          </div>
          ` : ''}
          <div class="detail-row">
            <span class="detail-label">Sent:</span>
            <span class="detail-value">${new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</span>
          </div>
        </div>
        
        <div class="original-text">${contact.message}</div>
      </div>
      
      <div class="signature">
        <div class="signature-content">
          <div>We look forward to supporting you further.</div>
          <div class="divider"></div>
          <div class="signature-name">Best regards,</div>
          <div class="signature-name">Anwar Ramadan</div>
          <div class="signature-title">AR-Coder – Professional Services</div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>This email was sent in response to your inquiry via Anwar Ramadan’s website.</strong></p>
      <p>If you have additional questions, simply reply to this message and our team will assist you further.</p>
      <p>© ${new Date().getFullYear()} AR-Coder. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};
exports.createReplyEmailTemplate = createReplyEmailTemplate;
//# sourceMappingURL=createReplyEmailTemplate.js.map