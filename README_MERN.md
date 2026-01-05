# Sree Anjaneya Exports Website - MERN Stack

A comprehensive corporate website for a garment manufacturing and export company built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Public Features
- **Product Catalog**: Browse products by categories with filtering
- **Product Details**: View detailed product information
- **Buyer Inquiry Form**: Submit company details and requirements
- **Sample Request**: Request product samples with shipping details
- **Sample Tracking**: Track sample request status
- **Contact Page**: Company information with Google Maps

### Admin Features
- **Authentication**: Secure admin login
- **Dashboard**: Overview statistics
- **Product Management**: CRUD operations for products
- **Buyer Management**: View and update buyer inquiries
- **Sample Management**: Update sample request statuses

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React, React Router, Axios
- **Styling**: Bootstrap 5, Bootstrap Icons
- **Authentication**: Express Sessions

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Install backend dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/garment-export
   SESSION_SECRET=your-secret-key-change-in-production
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

3. **Create an admin user**:
   ```bash
   node scripts/create-admin.js
   ```
   Or with custom credentials:
   ```bash
   node scripts/create-admin.js username email@example.com password
   ```

4. **Start the backend server**:
   ```bash
   npm run server
   ```
   Or use `npm start` for production mode.

### Frontend Setup

1. **Navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

### Running Both Servers

From the root directory, you can run both servers concurrently:
```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:5000`
- React frontend on `http://localhost:3000`

## Project Structure

```
garment-export-company/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/     # Admin components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── layout/    # Layout components (Navbar, Footer)
│   │   │   └── pages/     # Page components
│   │   ├── services/
│   │   │   └── api.js     # API service layer
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── config/                 # Configuration files
├── controllers/
│   └── api/               # API controllers (JSON responses)
├── middleware/            # Custom middleware
├── models/                # MongoDB models
├── routes/
│   └── api/              # API routes
├── scripts/              # Utility scripts
├── server.js             # Main server file
└── package.json
```

## API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products (with optional category filter)
- `GET /api/products/:id` - Get product details
- `GET /api/products/featured` - Get featured products
- `POST /api/inquiry` - Submit buyer inquiry
- `GET /api/samples/products` - Get products for sample request
- `POST /api/samples/request` - Submit sample request
- `POST /api/samples/track` - Track sample request

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/check-auth` - Check authentication status
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Add product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/buyers` - Get all buyers
- `GET /api/admin/buyers/:id` - Get buyer details
- `PUT /api/admin/buyers/:id/status` - Update buyer status
- `GET /api/admin/samples` - Get all sample requests
- `PUT /api/admin/samples/:id/status` - Update sample status

## Key Components

### React Components Structure

1. **Layout Components**:
   - `Navbar` - Navigation bar with auth status
   - `Footer` - Footer component

2. **Public Pages**:
   - `Home` - Homepage with featured products
   - `Products` - Product catalog with filtering
   - `ProductDetails` - Individual product details
   - `Inquiry` - Buyer inquiry form
   - `SampleRequest` - Sample request form
   - `SampleTrack` - Sample tracking
   - `Contact` - Contact page with map

3. **Admin Components**:
   - `AdminLogin` - Admin login page
   - `AdminDashboard` - Dashboard with statistics
   - `AdminProducts` - Product management
   - `AdminProductForm` - Add/Edit product form
   - `AdminBuyers` - Buyer inquiries list
   - `AdminBuyerDetails` - Buyer details page
   - `AdminSamples` - Sample requests management

4. **Auth**:
   - `PrivateRoute` - Protected route wrapper

## Usage Notes

### Adding Products
1. Login to admin panel
2. Navigate to "Manage Products"
3. Click "Add New Product"
4. Fill in details (use image URLs for now)
5. Save

### Managing Sample Requests
1. Go to "Sample Requests" in admin panel
2. Click "Update" on any request
3. Change status and add tracking number
4. Save changes

### Image Handling
Currently uses image URLs. For production, consider:
- Implementing file upload (Multer)
- Using cloud storage (AWS S3, Cloudinary)
- Image optimization

## Production Deployment

1. **Build React app**:
   ```bash
   cd client
   npm run build
   ```

2. **Set environment variables** for production

3. **Start server**:
   ```bash
   npm start
   ```

4. The server will serve the React build files in production mode

## Security Notes

- Change default admin password
- Use strong `SESSION_SECRET` in production
- Enable HTTPS in production
- Implement rate limiting
- Add CSRF protection
- Sanitize user inputs
- Use environment variables for sensitive data

## License

This project is provided as-is for educational and commercial use.

