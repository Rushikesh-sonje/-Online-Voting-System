const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const candidateRoute = require('./routes/candidateRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/candidates',candidateRoute);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message,
  });
});

module.exports = app;
