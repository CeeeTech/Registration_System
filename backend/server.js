const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI; 

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log('Connected to the database and listening on port', PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
