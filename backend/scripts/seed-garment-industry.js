/**
 * Script to seed high-fidelity garment industry products
 * Focuses on export-quality readymade apparel
 * Usage: node scripts/seed-garment-industry.js
 */

const mongoose = require('mongoose');
const Product = require('../models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const garmentProducts = [
    {
        name: "Premium Pique Polo T-shirt",
        category: "Gents Wear",
        description: "Export-quality pique cotton polo with reinforced stitching. Durable, breathable, and designed for corporate export markets.",
        fabricType: "Pique Cotton",
        gsm: "220",
        sizeRange: "S, M, L, XL, XXL",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"],
        isActive: true
    },
    {
        name: "Sustainable Organic Cotton Tee",
        category: "T-shirts",
        description: "100% GOTS certified organic cotton crew neck. Soft feel, eco-friendly dyes, and premium retail finish.",
        fabricType: "Organic Cotton",
        gsm: "180",
        sizeRange: "S, M, L, XL",
        images: ["https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80"],
        isActive: true
    },
    {
        name: "Performance Tech Activewear",
        category: "Gents Wear",
        description: "Moisture-wicking dry-fit t-shirt for international athletic brands. High-elasticity seams and UV protection.",
        fabricType: "Polyester/Spandex Blend",
        gsm: "140",
        sizeRange: "M, L, XL, XXL",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80"],
        isActive: true
    },
    {
        name: "Classic French Terry Hoodie",
        category: "Gents Wear",
        description: "Heavyweight French Terry hoodie with lined hood and kangaroo pocket. Premium export-grade loungewear.",
        fabricType: "French Terry Cotton",
        gsm: "350",
        sizeRange: "S, M, L, XL",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80"],
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

        // Optional: Remove old traditional products to clean up
        const traditionalProducts = [
            "Designer Men's Silk Kurta",
            "Royal Wedding Sherwani",
            "Kanchipuram Silk Saree",
            "Embroidered Anarkali Suit"
        ];
        await Product.deleteMany({ name: { $in: traditionalProducts } });
        console.log('Removed traditional textile products.');

        for (const prod of garmentProducts) {
            const existing = await Product.findOne({ name: prod.name });
            await Product.findOneAndUpdate(
                { name: prod.name },
                { $set: prod },
                { new: true, upsert: true, runValidators: true }
            );

            if (existing) {
                console.log(`Updated: ${prod.name}`);
            } else {
                console.log(`Added: ${prod.name}`);
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
