# Admin Panel - User Registration, Login, and Profile Management

## Project Overview
This project is designed to provide an intuitive admin panel where users can register, log in, and manage their profiles. After logging in, users are directed to a personalized dashboard with a welcome message featuring their name. The admin panel also includes a profile page where users can view their personal information.

## Features
- **User Registration**: Users can sign up with their email and password, with passwords securely encrypted using Bcrypt.
- **User Login**: Users can log in using their credentials. Sessions are managed with cookies for security and ease of use.
- **Personalized Dashboard**: After successful login, users are welcomed by name on their dashboard.
- **Profile Page**: A page dedicated to displaying user-specific details, including their email and other profile information.
- **Session Management**: Cookies are used to handle user sessions after login, ensuring a secure and personalized experience.
  
## Technologies Used
- **Node.js**: Backend server framework.
- **Express.js**: Lightweight web application framework.
- **EJS**: Embedded JavaScript templating engine for dynamic HTML rendering.
- **MongoDB/Mongoose**: NoSQL database for storing user information.
- **Cookie-Parser**: Middleware for handling cookies and managing user sessions.
- **Body-Parser**: Middleware to parse incoming request bodies.
- **Bcrypt.js**: Library for securely hashing and encrypting passwords.

## Project Structure
```bash
.
├── config/              # Database configuration
├── controllers/         # Handles business logic (registration, login, etc.)
├── models/              # Mongoose schemas for users
├── routes/              # Route definitions for user-related operations
├── views/               # EJS templates for rendering HTML
├── public/              # Static files (CSS, images, etc.)
└── app.js               # Main application file
```
## Project Flow
- **Registration Page**: Users can create an account by providing their email, password, and other profile details. Passwords are encrypted before being saved to the database.
- **Login Page**: Users log in with their credentials. A session is created using cookies upon successful login.
- **Dashboard Page**: After logging in, users are redirected to a dashboard where they are welcomed with a personalized message.
- **Profile Page**: Users can view their personal details on the profile page, which retrieves data from the MongoDB database.

## Installation
- **Clone the repository:**
  ```bash
  git clone https://github.com/blog_signup_signin/
  cd admin-panel
  ```

  - **Install dependencies:**
  ```bash
  npm install
  ```
  
  - **Run the server:**
  ```bash
  npm start
  ```

 - Visit **http://localhost:3000** in your browser.

  ![Admin Dashboard Screenshot](./views/images/logo(1).jpg)

