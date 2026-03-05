/**
 * Script to simulate processed inquiries for a more "realistic" dashboard
 * Usage: node scripts/simulate-engagement.js
 */

const mongoose = require('mongoose');
const Buyer = require('../models/Buyer');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

async function simulateEngagement() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const buyers = await Buyer.find({ status: 'New' });
        console.log(`Found ${buyers.length} new inquiries.`);

        if (buyers.length === 0) {
            console.log('No new inquiries found to process.');
            process.exit(0);
        }

        // Process about 40% of them
        const toProcessCount = Math.ceil(buyers.length * 0.4);
        const statuses = ['Contacted', 'Qualified'];

        for (let i = 0; i < toProcessCount; i++) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            buyers[i].status = randomStatus;
            await buyers[i].save();
            console.log(`Updated ${buyers[i].contactPerson} to status: ${randomStatus}`);
        }

        console.log(`Successfully simulated engagement for ${toProcessCount} buyers.`);
        process.exit(0);
    } catch (error) {
        console.error('Error simulating engagement:', error);
        process.exit(1);
    }
}

simulateEngagement();
