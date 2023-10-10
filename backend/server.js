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
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'hive-auto-vote-jwt-secret-key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

app.post('/auth/signin', async (req, res) => {
  try {
    // Generate a JWT token with the username and expiration time
    const token = jwt.sign(req.body, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION });

    // Set a cookie with the token
    res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true }));
    res.json({ success: true, message: 'Authentication successful', token });
  } catch (error) {
    // Handle errors separately, providing meaningful messages
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Error during authentication' });
  }
});

app.get('/auth/me', async (req, res) => {
  const defaultReturnObject = { authenticated: false};
  try {
    const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    res.status(200).json({ authenticated: true, ...decoded });
  }
  catch (err) {
    console.log('POST auth/me, Something Went Wrong', err);
    res.status(400).json(defaultReturnObject);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
