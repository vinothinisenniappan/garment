const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function checkProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected');
        const products = await Product.find({}, 'name category images');
        console.log(JSON.stringify(products, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkProducts();
