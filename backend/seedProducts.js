/**
 * Seed Script for Products
 * Usage: node seedProducts.js
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export';

const products = [
  {
    name: "Premium Ribbed Vest",
    category: "T-shirts",
    description: "A high-end, premium white cotton t-shirt displayed on a minimalistic wooden hanger. Professional studio lighting, sharp details of the fabric texture (single jersey cotton), elegant and clean aesthetic.",
    fabricType: "2x2 Rib Cotton",
    gsm: "180",
    sizeRange: "S - XXL",
    images: ["/images/products/white-tshirt.png"],
    price: 12.99,
    stockQuantity: 500,
    inventory: { S: 100, M: 150, L: 150, XL: 100 },
    colors: ["White"],
    isFeatured: true
  },
  {
    name: "Essential White Vest",
    category: "T-shirts",
    description: "Essential white vest made from high-quality ribbed cotton. Perfect for layering or as a standalone comfort wear.",
    fabricType: "Ribbed Cotton",
    gsm: "140",
    sizeRange: "S, M, L, XL",
    images: ["/images/products/white-tshirt.png"],
    price: 9.99,
    stockQuantity: 800,
    inventory: { S: 200, M: 200, L: 200, XL: 200 },
    colors: ["White"],
    isFeatured: false
  },
  {
    name: "Business Formal Shirt",
    category: "Shirts",
    description: "A premium men's formal dress shirt in light blue, perfectly pressed. High-quality cotton texture visible, sophisticated and luxury feel.",
    fabricType: "Egyptian Cotton",
    gsm: "120",
    sizeRange: "38 - 46",
    images: ["/images/products/formal-shirt.png"],
    price: 35.00,
    stockQuantity: 200,
    inventory: { S: 50, M: 50, L: 50, XL: 50 },
    colors: ["Sky Blue"],
    isFeatured: true
  },
  {
    name: "Premium Cotton Pyjamas",
    category: "Pyjamas",
    description: "A pair of premium organic cotton pyjamas in a soft charcoal grey. Soft, warm and cozy atmosphere, high-end textile quality.",
    fabricType: "Organic Cotton",
    gsm: "160",
    sizeRange: "S, M, L, XL",
    images: ["/images/products/cotton-pj.png"],
    price: 24.50,
    stockQuantity: 300,
    inventory: { S: 75, M: 75, L: 75, XL: 75 },
    colors: ["Charcoal Grey"],
    isFeatured: true
  },
  {
    name: "Kids Comfort Night Dress",
    category: "Kidswear",
    description: "Children's organic cotton nightwear in a soft mint green. Soft, natural morning light, emphasizing comfort and high-quality organic material.",
    fabricType: "100% Cotton Interlock",
    gsm: "180",
    sizeRange: "2T - 10Y",
    images: ["/images/products/kids-pj.png"],
    price: 18.00,
    stockQuantity: 400,
    inventory: { S: 100, M: 100, L: 100, XL: 100 },
    colors: ["Mint Green"],
    isFeatured: true
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDB();
