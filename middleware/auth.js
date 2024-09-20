// middleware/auth.js
const User = require('../models/User');

// Middleware to check if user is already logged in
const checkAuth = async (req, res, next) => {
  const userId = req.cookies.user_id;
  
  if (userId) {
    // If cookie is present, find the user
    const user = await User.findById(userId);
    
    if (user) {
      // If user is found, redirect to dashboard
      return res.redirect('/dashboard');
    }
  }
  next();
};

module.exports = checkAuth;
