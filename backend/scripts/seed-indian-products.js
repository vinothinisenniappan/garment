/**
 * Script to seed Indian garment products
 * Usage: node scripts/seed-indian-products.js
 */

const mongoose = require('mongoose');
const Product = require('../models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const indianProducts = [
    {
        name: "Designer Men's Silk Kurta",
        category: "Gents Wear",
        description: "Premium silk kurta with intricate embroidery on collar and cuffs. Perfect for festive occasions.",
        fabricType: "Silk",
        gsm: "180",
        sizeRange: "S, M, L, XL, XXL",
        images: ["/assets/kurta.png"],
        isActive: true
    },
    {
        name: "Royal Wedding Sherwani",
        category: "Gents Wear",
        description: "Royal sherwani with heavy gold thread work on rich velvet fabric. Traditional wedding attire.",
        fabricType: "Velvet / Silk",
        gsm: "250",
        sizeRange: "M, L, XL, XXL",
        images: ["/assets/sherwani.png"],
        isActive: true
    },
    {
        name: "Kanchipuram Silk Saree",
        category: "Ladies Wear",
        description: "Traditional Kanchipuram silk saree with vibrant colors and authentic gold zari border.",
        fabricType: "Pure Silk",
        gsm: "N/A",
        sizeRange: "Free Size",
        images: ["/assets/saree.png"],
        isActive: true
    },
    {
        name: "Embroidered Anarkali Suit",
        category: "Ladies Wear",
        description: "Modern Anarkali suit with flowing georgette fabric and heavy designer embroidery.",
        fabricType: "Georgette",
        gsm: "120",
        sizeRange: "S, M, L, XL",
        images: ["/assets/anarkali.png"],
        isActive: true
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        for (const prod of indianProducts) {
            const existing = await Product.findOne({ name: prod.name });
            if (!existing) {
                await new Product(prod).save();
                console.log(`Added: ${prod.name}`);
            } else {
                console.log(`Skipping: ${prod.name} (Already exists)`);
            }
        }

        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
