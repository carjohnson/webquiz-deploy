// middleware/auth.js
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect('/users/login?msg=Please log in to access this page');
  }
}

// requireRole('manager') -> middleware that only lets that role through.
// Must run after requireLogin (or anything that populates req.session.user),
// since it assumes req.session.user already exists.
function requireRole(role) {
  return function (req, res, next) {
    if (req.session && req.session.user && req.session.user.role === role) {
      return next();
    } else {
      return res.redirect('/users/login?msg=You are not authorized to access this page');
    }
  };
}

module.exports = { requireLogin, requireRole };