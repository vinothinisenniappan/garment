const mongoose = require('mongoose');
const Product = require('../models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

async function migrateData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Update Categories (Map old categories to new ones)
        const categoryMapping = {
            'Gents Wear': 'Shirts',
            'Ladies Wear': 'Shirts', // Mapping to something valid for now
            'Kids Wear': 'Kidswear',
            'T-shirts': 'T-shirts'
        };

        for (const [oldCat, newCat] of Object.entries(categoryMapping)) {
            const res = await Product.updateMany(
                { category: oldCat },
                { $set: { category: newCat } }
            );
            console.log(`Updated ${res.modifiedCount} products from "${oldCat}" to "${newCat}"`);
        }

        // 2. Update Images with high-quality sourced ones
        const imageUpdates = [
            { name: /Polo/i, image: "/assets/products/premium_polo.jpg", category: 'T-shirts' },
            { name: /Tee|T-shirt/i, image: "/assets/products/basic_tshirt.jpg", category: 'T-shirts' },
            { name: /Activewear/i, image: "/assets/products/activewear.jpg", category: 'T-shirts' },
            { name: /Hoodie|Pyjama/i, image: "/assets/products/pyjama_set.jpg", category: 'Pyjamas' },
            { name: /Kids/i, image: "/assets/products/kids_tshirt.jpg", category: 'Kidswear' }
        ];

        for (const update of imageUpdates) {
            const res = await Product.updateMany(
                { name: update.name },
                { $set: { images: [update.image], category: update.category } }
            );
            console.log(`Updated ${res.modifiedCount} products matching ${update.name} with new images`);
        }

        // 3. Fix any products that might still have invalid categories
        const validCategories = ['T-shirts', 'Shirts', 'Pyjamas', 'Kidswear'];
        const invalidRes = await Product.updateMany(
            { category: { $nin: validCategories } },
            { $set: { category: 'T-shirts' } }
        );
        console.log(`Fixed ${invalidRes.modifiedCount} products with invalid categories`);

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrateData();
