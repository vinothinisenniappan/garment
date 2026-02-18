# Sree Anjaneya Exports Website

A comprehensive corporate website for a garment manufacturing and export company built with Node.js, Express, MongoDB, and Bootstrap.

## Features

### Public Features
- **Product Catalog**: Browse products by categories (T-shirts, Gents Wear, Ladies Wear, Kids Wear)
- **Product Details**: View detailed product information including fabric type, GSM, size range, and images
- **Buyer Inquiry Form**: Submit company details and requirements for international buyers
- **Sample Request**: Request product samples with shipping address
- **Sample Tracking**: Track sample request status using email or tracking number
- **Contact Page**: Company information with Google Maps integration

### Admin Features
- **Authentication**: Secure admin login system
- **Dashboard**: Overview of products, buyers, and sample requests
- **Product Management**: Add, edit, and delete products
- **Buyer Management**: View and update buyer inquiry statuses
- **Sample Management**: Update sample request statuses and tracking numbers

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Templating**: EJS
- **Authentication**: Express Sessions, bcryptjs
- **Validation**: express-validator

## Installation

1. **Clone the repository** (or extract the project files)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/garment-export
   SESSION_SECRET=your-secret-key-change-in-production
   ```

4. **Start MongoDB**:
   Make sure MongoDB is running on your system. If using a local installation:
   ```bash
   mongod
   ```

5. **Create an admin user**:
   ```bash
   node scripts/create-admin.js
   ```
   Or with custom credentials:
   ```bash
   node scripts/create-admin.js username email@example.com password
   ```
   Default credentials:
   - Username: `admin`
   - Email: `admin@garmentexport.com`
   - Password: `admin123`

6. **Start the server**:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Access the website**:
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin/login

## Project Structure

```
├── backend/         # Node.js Express server
│   ├── config/      # Configuration files
│   ├── controllers/ # Business logic controllers
│   ├── middleware/  # Custom middleware
│   ├── models/      # MongoDB models
│   ├── public/      # Static files (CSS, JS, images)
│   ├── routes/      # Route definitions
│   ├── scripts/     # Utility scripts
│   ├── views/       # EJS templates
│   └── server.js    # Backend entry point
├── frontend/        # React Vite application
│   ├── src/         # React components & styles
│   └── ...
├── package.json     # Orchestration scripts
└── README.md
```

## Usage

### Adding Products

1. Login to the admin panel
2. Navigate to "Manage Products"
3. Click "Add New Product"
4. Fill in product details:
   - Name, Category, Description
   - Fabric Type, GSM, Size Range
   - Image URLs (one per line)
5. Save the product

### Managing Buyer Inquiries

1. Go to "Buyer Inquiries" in admin panel
2. View inquiry details
3. Update status (New, Contacted, Qualified, Rejected)
4. Add notes as needed

### Managing Sample Requests

1. Go to "Sample Requests" in admin panel
2. Click "Update" on any request
3. Change status (Requested, In Progress, Dispatched, Delivered)
4. Add tracking number when dispatched
5. Save changes

## Image Handling

Currently, the system accepts image URLs. For production use, consider implementing:
- File upload functionality using Multer
- Image storage service (AWS S3, Cloudinary, etc.)
- Image optimization and resizing

## Security Notes

- Change the default admin password immediately
- Use a strong `SESSION_SECRET` in production
- Enable HTTPS in production and set `secure: true` in session cookie
- Implement rate limiting for forms
- Add CSRF protection for forms
- Sanitize user inputs
- Use environment variables for sensitive data

## Customization

### Google Maps Location

Update the Google Maps embed URL in `views/contact.ejs` with your actual company location coordinates.

### Styling

Customize colors and styles in `public/css/style.css` using CSS variables defined at the top of the file.

### Email Notifications

Consider adding email notifications for:
- Buyer inquiry submissions
- Sample request status updates
- Admin notifications

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions, please refer to the code comments or create an issue in the repository.

