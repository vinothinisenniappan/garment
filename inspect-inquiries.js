const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Buyer = require('./backend/models/Buyer');

async function inspect() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        const now = new Date();
        const last7Days = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

        const count = await Buyer.countDocuments();
        console.log('Total Buyers:', count);

        const recent = await Buyer.find({}).sort({ submittedAt: -1 }).limit(5).lean();
        recent.forEach(b => {
            console.log(`- ${b.contactPerson}: Status=${b.status}, SubmittedAt=${b.submittedAt.toISOString()}, IsRecent=${b.submittedAt >= last7Days}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

inspect();
