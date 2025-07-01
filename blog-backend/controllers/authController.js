const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authController = {

  async register(req, res) {
    const { name, email, password, is_admin } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }


      const newUser = await User.createUser(name, email, password, is_admin);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ error: 'Server error during registration' });
    }
  },


  async login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        is_admin: user.is_admin,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    // ✅ Send both token and user object
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin
      },
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
}
}

module.exports = authController;
