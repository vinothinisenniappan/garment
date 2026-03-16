/**
 * Test script for email functionality
 * Run this to check if mailer.js is configured correctly.
 */
require('dotenv').config();
const mailer = require('../utils/mailer');

async function runTests() {
  console.log('--- Starting Email Functionality Tests ---');
  console.log('Checking environment variables...');
  
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  
  if (!user || !pass) {
    console.warn('WARNING: SMTP_USER or SMTP_PASS not found in .env. Emails will be skipped.');
  } else {
    console.log(`Using email: ${user}`);
  }

  try {
    console.log('\nTesting: sendInquiryConfirmation...');
    const res1 = await mailer.sendInquiryConfirmation('test@example.com', 'Test User');
    console.log('Result:', res1.skipped ? 'SKIPPED' : 'SUCCESS', res1.messageId || res1.reason);

    console.log('\nTesting: sendAdminNotification (Inquiry)...');
    const res2 = await mailer.sendAdminNotification('Inquiry', {
      buyerName: 'Test Buyer',
      companyName: 'Test Corp',
      buyerEmail: 'buyer@example.com',
      country: 'Testland'
    });
    console.log('Result:', res2.skipped ? 'SKIPPED' : 'SUCCESS', res2.messageId || res2.reason);

    console.log('\nTesting: sendStatusUpdate...');
    const res3 = await mailer.sendStatusUpdate('test@example.com', 'Test User', 'Inquiry', 'Qualified', '12345');
    console.log('Result:', res3.skipped ? 'SKIPPED' : 'SUCCESS', res3.messageId || res3.reason);

    console.log('\n--- Tests Completed ---');
  } catch (error) {
    console.error('\nERROR during testing:', error.message);
  }
}

runTests();
