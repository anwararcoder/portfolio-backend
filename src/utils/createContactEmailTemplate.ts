interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  website?: string;
}

export const createContactEmailTemplate = (contact: ContactData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); overflow: hidden; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; }
    .content { padding: 40px 30px; }
    .field { margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; }
    .field:last-child { border-bottom: none; margin-bottom: 0; }
    .label { font-weight: 600; color: #4a5568; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
    .value { color: #2d3748; font-size: 16px; margin: 0; word-wrap: break-word; }
    .message-box { background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin-top: 8px; }
    .timestamp { background: #edf2f7; padding: 16px; border-radius: 8px; margin-top: 20px; text-align: center; font-size: 14px; color: #718096; }
    .footer { background: #2d3748; color: #a0aec0; text-align: center; padding: 20px; font-size: 12px; }
    a { color: #667eea; text-decoration: none; }
    @media (max-width: 600px) { body { padding: 10px; } .content { padding: 25px 20px; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Submission</h1>
      <p>You have received a new message from your website</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">👤 Name</div>
        <p class="value">${contact.name}</p>
      </div>
      
      <div class="field">
        <div class="label">📧 Email</div>
        <p class="value"><a href="mailto:${contact.email}">${contact.email}</a></p>
      </div>
      
      ${
        contact.phone
          ? `
      <div class="field">
        <div class="label">📱 Phone</div>
        <p class="value"><a href="tel:${contact.phone}">${contact.phone}</a></p>
      </div>
      `
          : ""
      }
      
      ${
        contact.company
          ? `
      <div class="field">
        <div class="label">🏢 Company</div>
        <p class="value">${contact.company}</p>
      </div>
      `
          : ""
      }
      
      ${
        contact.website
          ? `
      <div class="field">
        <div class="label">🌐 Website</div>
        <p class="value"><a href="${contact.website.startsWith("http") ? contact.website : "https://" + contact.website}" target="_blank">${contact.website}</a></p>
      </div>
      `
          : ""
      }
      
      <div class="field">
        <div class="label">📝 Subject</div>
        <p class="value">${contact.subject}</p>
      </div>
      
      <div class="field">
        <div class="label">💬 Message</div>
        <div class="message-box">
          <p class="value" style="margin: 0; white-space: pre-wrap;">${contact.message}</p>
        </div>
      </div>
      
      <div class="timestamp">
        <strong>📅 Submitted:</strong> ${new Date().toLocaleString()}
      </div>
    </div>
    
    <div class="footer">
      <p>This email was automatically generated from the <strong>Contact Form</strong> on Anwar Ramadan’s website.</p>
    </div>
  </div>
</body>
</html>`;
};
