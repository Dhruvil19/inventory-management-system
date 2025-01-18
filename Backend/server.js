const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middlewares/authMiddleware'); // Import the auth middleware

dotenv.config();

const app = express();

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000',  // Change this to your frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Enable credentials if using cookies or session
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/inventoryDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth')); // No need to protect auth routes
app.use('/api/items', authMiddleware, require('./routes/items')); // Protect items route with auth middleware
app.use('/api/users', authMiddleware, require('./routes/users')); // Protect users route with auth middleware

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
