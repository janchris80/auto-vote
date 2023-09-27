// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use environment variables for configuration
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'hive-auto-vote';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Middleware to verify user authentication (example)
function authenticateUser(req, res, next) {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET_KEY);

    // You can also decode the token to get user information if needed
    // const username = decoded.username;

    // If the token is valid, the user is authenticated
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}


app.post('/authenticate', async (req, res) => {
  try {
    // Generate a JWT token with the username and expiration time
    const token = jwt.sign(req.body, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION });

    // Set a cookie with the token
    res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true }));
    res.json({ success: true, message: 'Authentication successful' });
  } catch (error) {
    // Handle errors separately, providing meaningful messages
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Error during authentication' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
