const nodemailer = require('nodemailer');

const ALERT_EMAIL_DEFAULT = 'vinothinis.23it@kongu.edu';

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    const missing = [];
    if (!host) missing.push('SMTP_HOST');
    if (!user) missing.push('SMTP_USER');
    if (!pass) missing.push('SMTP_PASS');
    return { transporter: null, missing };
  }

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    }),
    missing: []
  };
}

async function sendInquiryNotificationEmail({ buyerName, companyName, buyerEmail, country }) {
  const { transporter, missing } = buildTransporter();

  if (!transporter) {
    const reason = `SMTP configuration is missing: ${missing.join(', ')}`;
    console.warn(`Email notification skipped: ${reason}`);
    return { skipped: true, reason };
  }

  const recipient = process.env.ALERT_EMAIL || ALERT_EMAIL_DEFAULT;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const safeBuyerName = buyerName || 'Unknown Buyer';

  const subject = `${safeBuyerName} of the buyer placed an order`;
  const text = `You got a order message from the buyer(${safeBuyerName}).\n\nCompany: ${companyName || 'N/A'}\nBuyer Email: ${buyerEmail || 'N/A'}\nCountry: ${country || 'N/A'}`;

  const result = await transporter.sendMail({
    from,
    to: recipient,
    subject,
    text
  });

  return {
    skipped: false,
    messageId: result.messageId,
    accepted: result.accepted,
    rejected: result.rejected
  };
}

module.exports = {
  sendInquiryNotificationEmail
};
