require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup CORS - allow requests from frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

console.log('CORS enabled for:', process.env.FRONTEND_URL || 'http://localhost:5174');

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// basic health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route does not exist' });
});

// global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

// start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Ready to accept requests\n`);
});
