// Middleware to protect routes
const protect = (req, res, next) => {
    const userId = req.cookies.user_id;
  
    if (!userId) {
      return res.redirect('/login');
    }
    next();
  };
  
module.exports = protect;
