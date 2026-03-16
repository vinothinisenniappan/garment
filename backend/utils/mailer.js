const nodemailer = require('nodemailer');

const ALERT_EMAIL_DEFAULT = 'vinothinis.23it@kongu.edu';

function buildTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    const missing = [];
    if (!user) missing.push('SMTP_USER');
    if (!pass) missing.push('SMTP_PASS');
    return { transporter: null, missing };
  }

  return {
    transporter: nodemailer.createTransport({
      service: 'gmail', // Force gmail service for simplicity if using Gmail
      auth: { user, pass }
    }),
    missing: []
  };
}

/**
 * Generic function to send email
 */
async function sendEmail({ to, subject, text, html }) {
  const { transporter, missing } = buildTransporter();

  if (!transporter) {
    const reason = `SMTP configuration is missing: ${missing.join(', ')}`;
    console.warn(`Email skipped: ${reason}`);
    return { skipped: true, reason };
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  const result = await transporter.sendMail({
    from: `Garment Export Team <${from}>`,
    to,
    subject,
    text,
    html: html || text.replace(/\n/g, '<br>')
  });

  return {
    skipped: false,
    messageId: result.messageId,
    accepted: result.accepted,
    rejected: result.rejected
  };
}

/**
 * Send inquiry confirmation to buyer
 */
async function sendInquiryConfirmation(userEmail, userName) {
  return await sendEmail({
    to: userEmail,
    subject: 'Inquiry Confirmation',
    text: `Hello ${userName},\n\nYour inquiry has been successfully submitted.\nOur team will contact you shortly.\n\nThank you.\nGarment Export Team`
  });
}

/**
 * Send sample request confirmation to buyer
 */
async function sendSampleInquiryConfirmation(userEmail, userName, inquiryId) {
  return await sendEmail({
    to: userEmail,
    subject: `Sample Request Confirmation - ${inquiryId}`,
    text: `Hello ${userName},\n\nYour sample request (${inquiryId}) has been received.\nWe are reviewing your requirements and will update you on the status soon.\n\nThank you.\nGarment Export Team`
  });
}

/**
 * Send order confirmation to buyer
 */
async function sendOrderConfirmation(userEmail, userName, orderId) {
  return await sendEmail({
    to: userEmail,
    subject: `Order Confirmation - ${orderId}`,
    text: `Hello ${userName},\n\nYour order #${orderId} has been confirmed.\nOur team is now processing it.\n\nThank you.\nGarment Export Team`
  });
}

/**
 * Send detailed "Inquiry Accepted" email to buyer
 */
async function sendInquiryAcceptedEmail({
  userEmail,
  userName,
  productName,
  fabric,
  size,
  color,
  quantity,
  buyerMessage,
  deliveryCountry
}) {
  const siteUrl = process.env.APP_SITE_URL || process.env.FRONTEND_BASE_URL || 'https://yourwebsite.com';

  const text = [
    `Dear ${userName || 'Buyer'},`,
    '',
    'Thank you for your inquiry on our website.',
    '',
    'Your inquiry has been reviewed and accepted by our team.',
    '',
    'Product Details:',
    `Product Name: ${productName || 'As per your inquiry'}`,
    `Fabric: ${fabric || 'As per your inquiry'}`,
    `Size: ${size || 'As per your inquiry'}`,
    `Color: ${color || 'As per your inquiry'}`,
    `Quantity: ${quantity || 'As discussed'}`,
    '',
    'Inquiry Message:',
    buyerMessage || '—',
    '',
    'Current Status:',
    'Your inquiry has been accepted and our team will contact you shortly regarding pricing, sample confirmation, and order processing.',
    '',
    `Delivery Country: ${deliveryCountry || 'As per your inquiry'}`,
    '',
    'If you have any further questions, feel free to reply to this email.',
    '',
    'Best Regards,',
    'Garment Export Team',
    process.env.COMPANY_NAME || 'Sree Anjaneye Exports',
    process.env.CONTACT_EMAIL || (process.env.SMTP_FROM || process.env.SMTP_USER) || 'contact@yourcompany.com',
    siteUrl
  ].join('\n');

  return await sendEmail({
    to: userEmail,
    subject: 'Your Product Inquiry Has Been Accepted',
    text
  });
}

/**
 * Send admin notification for new events
 */
async function sendAdminNotification(type, details) {
  const recipient = process.env.ALERT_EMAIL || ALERT_EMAIL_DEFAULT;
  let subject = `Admin Notification: New ${type}`;
  let text = `New ${type} received.\n\nDetails:\n${JSON.stringify(details, null, 2)}`;

  if (type === 'Inquiry') {
    subject = `New Buyer Inquiry: ${details.buyerName}`;
    text = `You got a new inquiry from ${details.buyerName}.\n\nCompany: ${details.companyName}\nEmail: ${details.buyerEmail}\nCountry: ${details.country}`;
  } else if (type === 'Sample Request') {
    subject = `New Sample Request: ${details.buyerName}`;
    text = `A new sample request has been submitted.\n\nBuyer: ${details.buyerName}\nProduct: ${details.productName}\nQuantity: ${details.quantity}`;
  }

  return await sendEmail({
    to: recipient,
    subject,
    text
  });
}

/**
 * Send status update to buyer
 */
async function sendStatusUpdate(userEmail, userName, type, status, id) {
  return await sendEmail({
    to: userEmail,
    subject: `${type} Status Update - ${id}`,
    text: `Hello ${userName},\n\nThe status of your ${type.toLowerCase()} (${id}) has been updated to: ${status}.\n\nThank you.\nGarment Export Team`
  });
}

async function sendInquiryNotificationEmail({ buyerName, companyName, buyerEmail, country }) {
  // Keeping this for backward compatibility if needed, but internally using sendAdminNotification
  return await sendAdminNotification('Inquiry', { buyerName, companyName, buyerEmail, country });
}

module.exports = {
  sendEmail,
  sendInquiryConfirmation,
  sendSampleInquiryConfirmation,
  sendOrderConfirmation,
  sendAdminNotification,
  sendStatusUpdate,
  sendInquiryNotificationEmail,
  sendInquiryAcceptedEmail
};
