const jwt = require('jsonwebtoken');
const AppError = require('../utils/error.utils');

const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id, role, name, email }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = isLoggedIn;
