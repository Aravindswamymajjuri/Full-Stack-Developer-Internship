const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // get token from Authorization header (format: "Bearer token123...")
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      console.log('No token provided for protected route');
      return res.status(401).json({ message: 'You need to be logged in to access this' });
    }

    // verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('Token expired');
      return res.status(401).json({ message: 'Your session has expired. Please login again' });
    }
    console.log('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid or tampered token' });
  }
};

module.exports = authMiddleware;
