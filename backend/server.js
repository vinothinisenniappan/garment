/**
 * Backend server for Garment Export Company Website (MERN Stack)
 */

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

// Allow multiple frontend origins in production: comma-separated in CLIENT_URL
// Trailing slashes are stripped so https://example.com/ and https://example.com both work
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

// Also allow the backend's own URL (Render health checks use it as origin)
if (process.env.RENDER_EXTERNAL_URL) {
  allowedOrigins.push(process.env.RENDER_EXTERNAL_URL.replace(/\/$/, ''));
}

if (isProduction) {
  // Required on Render/behind proxy for secure cookies to work correctly
  app.set('trust proxy', 1);
}

// Database connection
if (!mongoUri) {
  console.error('MongoDB connection error: Missing MONGODB_URI/MONGO_URI environment variable');
} else {
  mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Middleware
app.use(cors({
  origin(origin, callback) {
    // Allow same-origin/no-origin requests (health checks, server-side calls)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve static assets used by EJS site (css/js/images)
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // Cross-site cookies in production require SameSite=None + Secure
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// API Routes
app.use('/api/products', require('./routes/api/products'));
app.use('/api/inquiry', require('./routes/api/inquiry'));

app.use('/api/sample-inquiries', require('./routes/api/sampleInquiries'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/orders', require('./routes/api/orders'));


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve built React app in production (Vite output)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io initialization
const io = require('socket.io')(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
