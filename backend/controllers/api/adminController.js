/**
 * Admin API Controller
 * Handles admin authentication and management endpoints
 */

const Admin = require('../../models/Admin');
const Product = require('../../models/Product');
const Buyer = require('../../models/Buyer');
const SampleRequest = require('../../models/SampleRequest');
const Order = require('../../models/Order');
const Inquiry = require('../../models/Inquiry');
const Category = require('../../models/Category');
const Coupon = require('../../models/Coupon');
const Review = require('../../models/Review');
const { validationResult } = require('express-validator');

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

const extractQuantityFromText = (value) => {
  const raw = normalizeText(value);
  if (!raw) {
    return 1000;
  }

  const digits = raw.replace(/[^\d]/g, '');
  const parsed = Number.parseInt(digits, 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  return 1000;
};

const buildFabricType = (buyer, product) => {
  if (product?.fabricType) {
    return product.fabricType;
  }
  const requirementText = normalizeText(buyer.requirements);
  return requirementText || 'Standard Fabric';
};

const getPreferredCategories = (buyer) => {
  if (!Array.isArray(buyer.preferredCategories)) {
    return [];
  }
  return buyer.preferredCategories.filter(Boolean);
};

const createOrderFromBuyerInquiry = async (buyer) => {
  const existingOrder = await Order.findOne({ sourceBuyerInquiryId: buyer._id });
  if (existingOrder) {
    return { created: false, order: existingOrder, reason: 'existing-order' };
  }

  const preferredCategories = getPreferredCategories(buyer);
  const productQuery = { isActive: true };
  if (preferredCategories.length > 0) {
    productQuery.category = { $in: preferredCategories };
  }

  let matchedProduct = await Product.findOne(productQuery).sort({ createdAt: -1 });
  if (!matchedProduct) {
    matchedProduct = await Product.findOne({ isActive: true }).sort({ createdAt: -1 });
  }

  const quantity = extractQuantityFromText(buyer.annualVolume);
  const itemPrice = matchedProduct?.price || 0;
  const itemName = matchedProduct?.name || `${preferredCategories[0] || 'General'} Requirement`;
  const itemSize = matchedProduct?.sizeRange || 'Standard';

  const inquiry = await Inquiry.create({
    buyerId: buyer._id,
    fabricType: buildFabricType(buyer, matchedProduct),
    quantity,
    status: 'Approved',
    adminNotes: 'Auto-created from qualified buyer inquiry'
  });

  const order = await Order.create({
    sourceBuyerInquiryId: buyer._id,
    inquiryId: inquiry._id,
    buyerId: buyer._id,
    items: [{
      productId: matchedProduct?._id,
      name: itemName,
      size: itemSize,
      quantity,
      priceAtPurchase: itemPrice
    }],
    totalAmount: itemPrice * quantity,
    paymentStatus: 'Pending',
    status: 'Confirmed',
    currentMilestone: 'Sourcing',
    milestones: [
      { stage: 'Sourcing', status: 'In Progress', notes: 'Inquiry confirmed by admin' },
      { stage: 'Cutting', status: 'Pending' },
      { stage: 'Stitching', status: 'Pending' },
      { stage: 'QC', status: 'Pending' },
      { stage: 'Shipping', status: 'Pending' }
    ],
    shippingAddress: {
      name: buyer.contactPerson || buyer.companyName || 'Buyer',
      street: buyer.address || 'Address to be confirmed',
      city: '-',
      state: '-',
      zip: '-',
      country: buyer.country || '-'
    }
  });

  return { created: true, order, inquiry };
};

// Handle admin login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { username, password } = req.body;
    const admin = await Admin.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() }
      ]
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    req.session.adminId = admin._id;
    req.session.adminUsername = admin.username;

    res.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// Handle admin logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error during logout'
      });
    }
    res.json({
      success: true,
      message: 'Logout successful'
    });
  });
};

// Check if user is authenticated
exports.checkAuth = (req, res) => {
  if (req.session && req.session.adminId) {
    res.json({
      success: true,
      authenticated: true,
      admin: {
        id: req.session.adminId,
        username: req.session.adminUsername
      }
    });
  } else {
    res.json({
      success: true,
      authenticated: false
    });
  }
};

// Get dashboard stats
exports.getDashboard = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const last7Days = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    const prev7Days = new Date(last7Days.getTime() - (7 * 24 * 60 * 60 * 1000));

    // Basic Counts
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const totalBuyers = await Buyer.countDocuments();
    const totalOrders = await Order.countDocuments();
    const ordersToday = await Order.countDocuments({ createdAt: { $gte: startOfToday } });
    
    // Revenue Calculation
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Small Stock Alert (items with stock < 10)
    const lowStockAlerts = await Product.countDocuments({ stockQuantity: { $lt: 20 } });

    const totalSamples = await SampleRequest.countDocuments();
    const pendingSamples = await SampleRequest.countDocuments({ status: 'Requested' });
    const newInquiries = await Buyer.countDocuments({ status: 'New' });

    // Growth Calculations (Last 7 days vs Previous 7 days)
    const current7DaysInquiries = await Buyer.countDocuments({ submittedAt: { $gte: last7Days } });
    const prev7DaysInquiries = await Buyer.countDocuments({ submittedAt: { $gte: prev7Days, $lt: last7Days } });
    const inquiryTrend = prev7DaysInquiries === 0 ? (current7DaysInquiries > 0 ? '+100%' : '0%') : `${Math.round(((current7DaysInquiries - prev7DaysInquiries) / prev7DaysInquiries) * 100)}%`;

    // Engagement Rate
    const engagedBuyers = await Buyer.countDocuments({ status: { $ne: 'New' } });
    const engagementRate = totalBuyers === 0 ? 0 : Math.round((engagedBuyers / totalBuyers) * 100);

    // 7-Day Trend for Chart
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyInquiries = await Buyer.aggregate([
      { $match: { submittedAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const trendData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const found = dailyInquiries.find(item => item._id === dateStr);
      trendData.push(found ? found.count : 0);
    }

    const recentBuyers = await Buyer.find().sort({ submittedAt: -1 }).limit(10);
    const recentOrders = await Order.find()
      .populate('buyerId', 'companyName')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        totalBuyers,
        totalOrders,
        ordersToday,
        totalRevenue,
        lowStockAlerts,
        totalSamples,
        pendingSamples,
        newInquiries,
        engagementRate,
        inquiryTrend,
        trendData
      },
      recentBuyers,
      recentOrders
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading dashboard data',
      error: error.message
    });
  }
};

// Public dashboard (read-only) for frontend without session auth
exports.getDashboardPublic = async (req, res) => {
  try {
    const stats = {
      totalProducts: await Product.countDocuments({ isActive: true }),
      totalBuyers: await Buyer.countDocuments(),
      totalSamples: await SampleRequest.countDocuments(),
      pendingSamples: await SampleRequest.countDocuments({ status: 'Requested' }),
      newInquiries: await Buyer.countDocuments({ status: 'New' })
    };

    const recentBuyers = await Buyer.find().sort({ submittedAt: -1 }).limit(5);
    const recentSamples = await SampleRequest.find()
      .populate('productId', 'name')
      .sort({ requestedAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats,
      recentBuyers,
      recentSamples
    });
  } catch (error) {
    console.error('Error loading public dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading dashboard data',
      error: error.message
    });
  }
};

// Product management
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error loading products:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading products',
      error: error.message
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error loading product:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading product',
      error: error.message
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    // Handle image URLs - split by newline if it's a string
    let images = [];
    if (req.body.images) {
      if (typeof req.body.images === 'string') {
        images = req.body.images.split('\n').map(img => img.trim()).filter(img => img.length > 0);
      } else if (Array.isArray(req.body.images)) {
        images = req.body.images.filter(img => img.trim());
      }
    }

    const productData = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      fabricType: req.body.fabricType,
      gsm: req.body.gsm,
      sizeRange: req.body.sizeRange,
      price: req.body.price,
      inventory: req.body.inventory || { S: 0, M: 0, L: 0, XL: 0 },
      colors: req.body.colors || [],
      images: images,
      isFeatured: req.body.isFeatured || false
    };

    const product = new Product(productData);
    await product.save();

    const io = req.app.get('socketio');
    io?.emit('products-updated', {
      action: 'created',
      productId: product._id.toString()
    });

    res.json({
      success: true,
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    // Handle image URLs
    let images = [];
    if (req.body.images) {
      if (typeof req.body.images === 'string') {
        images = req.body.images.split('\n').map(img => img.trim()).filter(img => img.length > 0);
      } else if (Array.isArray(req.body.images)) {
        images = req.body.images.filter(img => img.trim());
      }
    }

    const productData = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      fabricType: req.body.fabricType,
      gsm: req.body.gsm,
      sizeRange: req.body.sizeRange,
      price: req.body.price,
      inventory: req.body.inventory,
      colors: req.body.colors,
      images: images,
      isFeatured: req.body.isFeatured,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const io = req.app.get('socketio');
    io?.emit('products-updated', {
      action: 'updated',
      productId: product._id.toString()
    });

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const io = req.app.get('socketio');
    io?.emit('products-updated', {
      action: 'deleted',
      productId: req.params.id
    });

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// Buyer inquiries management
exports.getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find().sort({ submittedAt: -1 });
    res.json({
      success: true,
      buyers
    });
  } catch (error) {
    console.error('Error loading buyers:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading buyer inquiries',
      error: error.message
    });
  }
};

exports.getBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }

    const sampleRequests = await SampleRequest.find({ buyerId: buyer._id })
      .populate('productId', 'name category')
      .sort({ requestedAt: -1 });

    res.json({
      success: true,
      buyer,
      sampleRequests
    });
  } catch (error) {
    console.error('Error loading buyer details:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading buyer details',
      error: error.message
    });
  }
};

exports.updateBuyerStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }

    buyer.status = status;
    if (notes !== undefined) {
      buyer.notes = notes;
    }
    await buyer.save();

    let autoOrder = null;
    if (status === 'Qualified') {
      autoOrder = await createOrderFromBuyerInquiry(buyer);
    }

    const io = req.app.get('socketio');
    if (io) {
      io.emit('buyer-status-updated', {
        buyerId: buyer._id,
        status: buyer.status
      });
      if (autoOrder?.created) {
        io.emit('orders-updated', {
          buyerId: buyer._id,
          orderId: autoOrder.order._id,
          source: 'buyer-inquiry'
        });
      }
    }

    res.json({
      success: true,
      message: autoOrder?.created
        ? 'Buyer status updated and order created for inventory'
        : 'Buyer status updated successfully',
      buyer,
      autoOrderCreated: Boolean(autoOrder?.created),
      orderId: autoOrder?.order?._id || null
    });
  } catch (error) {
    console.error('Error updating buyer status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating buyer status',
      error: error.message
    });
  }
};

// Sample requests management
exports.getSamples = async (req, res) => {
  try {
    const samples = await SampleRequest.find()
      .populate('productId', 'name category')
      .populate('buyerId', 'companyName email')
      .sort({ requestedAt: -1 });

    res.json({
      success: true,
      samples
    });
  } catch (error) {
    console.error('Error loading samples:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading sample requests',
      error: error.message
    });
  }
};

exports.updateSampleStatus = async (req, res) => {
  try {
    const { status, trackingNumber, notes } = req.body;
    const updateData = { status, notes };

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    if (status === 'Dispatched') {
      updateData.dispatchedAt = Date.now();
    }

    const sampleRequest = await SampleRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!sampleRequest) {
      return res.status(404).json({
        success: false,
        message: 'Sample request not found'
      });
    }

    res.json({
      success: true,
      message: 'Sample status updated successfully',
      sampleRequest
    });
  } catch (error) {
    console.error('Error updating sample status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating sample status',
      error: error.message
    });
  }
};

// Category Management
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error loading categories' });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.json({ success: true, message: 'Category added', category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding category' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting category' });
  }
};

// Coupon Management
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error loading coupons' });
  }
};

exports.addCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.json({ success: true, message: 'Coupon created', coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating coupon' });
  }
};

// Review Management
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('productId', 'name')
      .populate('buyerId', 'contactPerson')
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error loading reviews' });
  }
};

exports.updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: req.body.isApproved }, { new: true });
    res.json({ success: true, message: 'Review status updated', review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating review' });
  }
};

// Order Management (Full)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyerId', 'companyName contactPerson email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error loading orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus, currentMilestone } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status, paymentStatus, currentMilestone }, 
      { new: true }
    );
    res.json({ success: true, message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order' });
  }
};
