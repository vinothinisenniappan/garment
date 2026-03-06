const mongoose = require('mongoose');
const Buyer = require('./backend/models/Buyer');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function testCompare() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export');
        console.log('Connected to MongoDB');

        const user = await Buyer.findOne({ email: 'vino@m.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        console.log('User found. Hashed password:', user.password);

        try {
            // Testing with a dummy password just to see if bcrypt crashes
            const isMatch = await user.comparePassword('anypassword');
            console.log('Comparison successful (no crash). Match:', isMatch);
        } catch (bcryptErr) {
            console.error('Bcrypt comparison CRASHED:', bcryptErr);
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

testCompare();
