const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getDashboard, getProfile } = require('../controllers/userController');
const bcrypt = require('bcrypt'); // Make sure bcrypt is required
const User = require('../models/User'); // Assuming you have a User model
const checkAuth = require('../middleware/auth');

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    // Validate input
    if (!username || !email || !password || !confirm_password) {
        return res.status(400).send('All fields are required.');
    }
    
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match.');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User already exists. Please login.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    await newUser.save();

    // Redirect to login page after registration
    res.redirect('/login');
});

// Login route
router.post('/login', loginUser);

// Dashboard route (protected route)
router.get('/dashboard', getDashboard);

// Profile route (protected route)
router.get('/profile', getProfile);

// GET Register and Login Pages
router.get('/register', checkAuth, (req, res) => {
  res.render('register');
});

router.get('/login', checkAuth, (req, res) => {
  res.render('login');
});

module.exports = router;
