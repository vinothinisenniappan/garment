/**
 * Script to create an admin user
 * Usage: node scripts/create-admin.js
 */

const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');
  
  // Get command line arguments or use defaults
  const username = process.argv[2] || 'admin';
  const email = process.argv[3] || 'admin@garmentexport.com';
  const password = process.argv[4] || 'admin123';
  
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: username.toLowerCase() });
    if (existingAdmin) {
      console.log('Admin user already exists with this username.');
      process.exit(1);
    }
    
    // Create new admin
    const admin = new Admin({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: password
    });
    
    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\nPlease change the default password after first login!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

