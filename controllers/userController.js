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

  // Check if the user ID exists in the cookies
  if (!userId) {
    return res.redirect('/login');  // Redirect to login if no user ID is found
  }

  try {
    // Fetch the user from the database using the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.redirect('/login');  // Redirect if the user doesn't exist
    }

    // Pass the username to the EJS template
    res.render('dashboard', { username: user.username });
  } catch (err) {
    console.error(err);
    res.redirect('/login');  // Handle errors by redirecting to login
  }
};


// Profile (protected route)
const getProfile = async (req, res) => {
  const userId = req.cookies.user_id;
  
  // Query the database for the user using the ID stored in the cookie
  const user = await User.findById(userId);

  // Check if user exists, else redirect to login
  if (!user) {
    return res.redirect('/login');
  }

  // Render the profile page and pass the username and email to EJS
  res.render('profile', { username: user.username, email: user.email });
};



module.exports = {
  registerUser,
  loginUser,
  getDashboard,
  getProfile
};
