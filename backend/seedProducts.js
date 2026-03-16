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
    images: ["/images/products/2.webp"],
    price: 9.99,
    stockQuantity: 800,
    inventory: { S: 200, M: 200, L: 200, XL: 200 },
    colors: ["White"],
    isFeatured: false
  },
  {
    name: "Premium Cotton Pyjamas",
    category: "Pyjamas",
    description: "A pair of premium organic cotton pyjamas in a soft charcoal grey. Soft, warm and cozy atmosphere, high-end textile quality.",
    fabricType: "Organic Cotton",
    gsm: "160",
    sizeRange: "S, M, L, XL",
    images: ["/images/products/girls.avif"],
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
    images: ["/images/products/1.webp"],
    price: 18.00,
    stockQuantity: 400,
    inventory: { S: 100, M: 100, L: 100, XL: 100 },
    colors: ["Mint Green"],
    isFeatured: true
  },
  {
    name: "Shorts Cotton",
    category: "Shorts",
    description: "Manufactured in our certified Indian facility and exported to Italy for the Navigare brand (est. 1961). This pyjama set — a crew-neck long-sleeve top and matching full-length trousers — is produced under strict ISO 9002 quality standards and Sedex ethical compliance. Shipped to European markets with combed-cotton quality verified at our factory floor in Tamil Nadu, India.",
    fabricType: "Combed Cotton Single Jersey",
    gsm: "170",
    sizeRange: "S, M, L, XL, XXL",
    images: ["/images/products/1.avif"],
    price: 22.00,
    stockQuantity: 600,
    inventory: { S: 120, M: 160, L: 160, XL: 100, XXL: 60 },
    colors: ["Navy Blue / Red", "Steel Blue / Dark Grey"],
    isFeatured: true,
    exportClient: "Navigare Underwear, Italy",
    exportDestination: "Italy / Europe"
  },
  {
    name: "Navigare Premium Nightwear Set",
    category: "Pyjamas",
    description: "Our flagship premium nightwear set — exported under the Navigare Premium line to European retail. Crafted from high-grade combed cotton with ribbed-finish cuffs and a refined chest embroidery logo. Packaged in Navigare's signature gift box (coton pettinato/combed cotton label). This product shipment has been successfully delivered to Italy and is currently retailing in premium European underwear stores.",
    fabricType: "Combed Pettinato Cotton",
    gsm: "200",
    sizeRange: "S, M, L, XL, XXL",
    images: ["/images/products/premium-nightwear.png"],
    price: 38.00,
    stockQuantity: 250,
    inventory: { S: 50, M: 70, L: 70, XL: 40, XXL: 20 },
    colors: ["Dark Navy", "Classic White"],
    isFeatured: true,
    exportClient: "Navigare Underwear, Italy",
    exportDestination: "Italy / Europe"
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
