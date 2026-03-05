const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function updateImages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const updates = [
            { name: /Polo/i, image: "/assets/products/premium_polo.jpg" },
            { name: /Organic Cotton Tee/i, image: "/assets/products/basic_tshirt.jpg" },
            { name: /Activewear/i, image: "/assets/products/activewear.jpg" },
            { name: /Hoodie/i, image: "/assets/products/pyjama_set.jpg" } // Using pyjama set as a temporary high-quality replacement for hoodie if needed, or better to rename.
        ];

        for (const update of updates) {
            const res = await Product.updateMany(
                { name: update.name },
                { $set: { images: [update.image] } }
            );
            console.log(`Updated ${res.modifiedCount} products matching ${update.name}`);
        }

        console.log('Image updates completed.');
        process.exit(0);
    } catch (err) {
        console.error('Error updating images:', err);
        process.exit(1);
    }
}

updateImages();
