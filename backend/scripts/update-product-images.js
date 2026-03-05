const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const updateProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export');
        console.log('Connected to MongoDB');

        // 1. Update existing products
        await Product.findOneAndUpdate(
            { name: /Classic French Terry Hoodie/i },
            {
                name: 'Premium Cotton Pyjamas',
                description: 'Ultra-soft 100% organic cotton pyjama set for maximum comfort.',
                category: 'Pyjamas',
                images: ['/assets/products/d1.webp'],
                fabricType: 'Organic Cotton',
                gsm: '180'
            }
        );

        await Product.findOneAndUpdate(
            { name: /Performance Tech Activewear/i },
            {
                name: 'Premium Cotton T-Shirt',
                description: 'Classic fit basic t-shirt made from high-quality single jersey fabric.',
                category: 'T-shirts',
                images: ['/assets/products/basic_tshirt.jpg'],
                fabricType: 'Single Jersey Cotton',
                gsm: '160'
            }
        );

        await Product.findOneAndUpdate(
            { name: /Sustainable Organic Cotton Tee/i },
            {
                name: 'Essential White Vest',
                category: 'T-shirts', // Assuming Vest belongs here or we could add a new category
                images: ['/assets/products/mens_vest.png'],
                fabricType: 'Ribbed Cotton',
                gsm: '140'
            }
        );

        // 2. Add new products
        const newProducts = [
            {
                name: 'Kids Comfort Night Dress',
                category: 'Kidswear',
                description: 'Soft and breathable cotton night dress for kids with playful patterns.',
                fabricType: '100% Cotton Interlock',
                gsm: '180',
                sizeRange: '2T - 10Y',
                images: ['/assets/products/k1.webp'],
                isActive: true
            },
            {
                name: 'Premium Ribbed Vest',
                category: 'T-shirts',
                description: 'High-quality ribbed cotton vest for men, perfect for layering or summer wear.',
                fabricType: '2x2 Rib Cotton',
                gsm: '160',
                sizeRange: 'S - XXL',
                images: ['/assets/products/mens_vest.png'],
                isActive: true
            }
        ];

        for (const p of newProducts) {
            const existing = await Product.findOne({ name: p.name });
            if (!existing) {
                await new Product(p).save();
                console.log(`Added product: ${p.name}`);
            } else {
                await Product.findByIdAndUpdate(existing._id, p);
                console.log(`Updated product: ${p.name}`);
            }
        }

        console.log('Database updated successfully');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error updating database:', err);
        process.exit(1);
    }
};

updateProducts();
