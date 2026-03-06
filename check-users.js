const mongoose = require('mongoose');
const Buyer = require('./backend/models/Buyer');
require('dotenv').config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export');
        console.log('Connected to MongoDB');

        const users = await Buyer.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- Email: ${u.email}, Contact: ${u.contactPerson}, Status: ${u.status}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkUsers();
