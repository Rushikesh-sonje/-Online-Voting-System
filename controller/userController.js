const User = require('../models/user');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/error.utils');

const cookieOptions = {
  httpOnly: true,
  secure: false, // set to true only in production with HTTPS
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const signup = async (req, res, next) => {
  const { name, age, email, mobile, address, aadharCardNumber, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError('User already exists with this email', 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      age,
      email,
      mobile,
      address,
      aadharCardNumber,
      password: hashedPassword,
      role,
    });
    await user.save();

    const token = await user.generateAuthToken();
    res.cookie('token', token, cookieOptions);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  const { aadharCardNumber, password } = req.body;
  if (!aadharCardNumber || !password) return next(new AppError('Aadhar Card Number and password are required', 400));

  try {
    const user = await User.findOne({ aadharCardNumber });
    if (!user) return next(new AppError('Invalid Aadhar Card Number or password', 401));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError('Invalid Aadhar Card Number or password', 401));

    const token = await user.generateAuthToken();
    res.cookie('token', token, cookieOptions);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const logout = async (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.status(200).json({ message: 'Logout successful' });
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return next(new AppError('User not found', 404));
    res.status(200).json({ user });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return next(new AppError('User not found', 404));
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return next(new AppError('Old password is incorrect', 401));
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};


module.exports = { signup, login, logout, getProfile,changePassword };
