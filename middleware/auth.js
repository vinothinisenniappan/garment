/**
 * Authentication Middleware
 * Protects admin routes by checking session authentication
 */

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.adminId) {
    return next();
  } else {
    req.session.returnTo = req.originalUrl;
    res.redirect('/admin/login');
  }
};

module.exports = {
  isAuthenticated
};

