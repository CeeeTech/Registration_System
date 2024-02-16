const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { username, password, email, fullName, department, phone, position, birthdate } = req.body;

  try {
    // Check if user already exists by username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    const newUser = new User({ username, password: hashedPassword, email, fullName, department, phone, position, birthdate });
    // Save the user to the database
    await newUser.save();

    // Generate JWT token with user ID payload and set expiration time to 1 hour
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token upon successful signup
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    // Check for duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }
    // Handle other server errors
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if user exists by email
    let user = await User.findOne({ email: emailOrUsername });

    // If user is not found by email, check by username
    if (!user) {
      user = await User.findOne({ username: emailOrUsername });
    }

    // If user still not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token with user ID payload and set expiration time to 1 hour
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token upon successful login
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    // Handle other server errors
    res.status(500).json({ error: 'Server error' });
  }
};
