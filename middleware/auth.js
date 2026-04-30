// middleware/auth.js
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect('/users/login?msg=Please log in to access this page');
  }
}

module.exports = { requireLogin };