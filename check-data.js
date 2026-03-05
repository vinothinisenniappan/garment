const mongoose = require('mongoose');
const Buyer = require('./backend/models/Buyer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected');
        const buyers = await Buyer.find({}, 'contactPerson status submittedAt');
        console.log(JSON.stringify(buyers, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkData();
