const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('User already registered. Please log in.');
  }

  // Hash the password and save the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, name });
  await newUser.save();

  // Redirect to login after successful registration
  res.redirect('/login');
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    // Set a cookie to manage session
    res.cookie('user_id', user._id, { httpOnly: true });
    return res.redirect('/dashboard');
  } else {
    res.status(400).send('Invalid credentials');
  }
};

// Dashboard (protected route)
const getDashboard = async (req, res) => {
  const userId = req.cookies.user_id;
  const user = await User.findById(userId);
  
  // Check if user exists, else redirect to login
  if (!user) {
    return res.redirect('/login');
  }

  res.render('dashboard', { name: user.name });
};

// Profile (protected route)
const getProfile = async (req, res) => {
  const userId = req.cookies.user_id;
  const user = await User.findById(userId);
  
  // Check if user exists, else redirect to login
  if (!user) {
    return res.redirect('/login');
  }

  res.render('profile', { user });
};

module.exports = {
  registerUser,
  loginUser,
  getDashboard,
  getProfile
};
