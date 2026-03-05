/**
 * Script to seed core export garment products
 * Usage: node scripts/seed-core-products.js
 */

const mongoose = require('mongoose');
const Product = require('../models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const coreProducts = [
    {
        name: "Premium Pique Polo T-shirt",
        category: "Gents Wear",
        description: "High-quality pique cotton polo with a classic fit. Durable, breathable, and perfect for corporate wear.",
        fabricType: "Pique Cotton",
        gsm: "220",
        sizeRange: "S, M, L, XL, XXL",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"],
        isActive: true
    },
    {
        name: "Organic Cotton Crew Neck",
        category: "T-shirts",
        description: "Sustainable organic cotton crew neck t-shirt. Soft feel, eco-friendly, and perfect for casual wear.",
        fabricType: "Organic Cotton",
        gsm: "180",
        sizeRange: "S, M, L, XL",
        images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80"],
        isActive: true
    },
    {
        name: "Classic Crew Sweatshirt",
        category: "Gents Wear",
        description: "Heavyweight fleece sweatshirt with ribbed cuffs and hem. Warm and comfortable for winter export.",
        fabricType: "Cotton Fleece",
        gsm: "320",
        sizeRange: "M, L, XL, XXL",
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80"],
        isActive: true
    },
    {
        name: "Kids Cotton Printed Tee",
        category: "Kids Wear",
        description: "Soft combed cotton t-shirt for kids with vibrant eco-friendly prints. Non-toxic dyes used.",
        fabricType: "100% Combed Cotton",
        gsm: "160",
        sizeRange: "2T, 3T, 4T, 5-6, 7-8",
        images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80"],
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

        for (const prod of coreProducts) {
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
