/**
 * Authentication Middleware
 * Protects admin routes by checking session authentication
 */

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.adminId) {
    return next();
  } else {
    // Return JSON for API routes instead of redirecting
    if (req.path.startsWith('/api') || req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/admin/login');
  }
};

module.exports = {
  isAuthenticated
};

