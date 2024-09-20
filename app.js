const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const path = require('path');
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));


// Routes
app.use('/', authRoutes);

// Optional Home route to redirect to login
app.get('/', (req, res) => {
  const userId = req.cookies.user_id;
  if (userId) {
    res.redirect('/dashboard');  // Redirect to dashboard if user is already logged in
  } else {
    res.redirect('/login');  // Otherwise, redirect to login
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
