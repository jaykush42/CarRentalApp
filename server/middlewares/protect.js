// server/middlewares/protect.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Host = require('../models/Host');

exports.protect = async (req, res, next) => {
  let token;

  // Extract token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.header('x-auth-token')) {
    token = req.header('x-auth-token');
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === 'user') {
      user = await User.findById(decoded.id).select('-password');
    } else if (decoded.role === 'host') {
      user = await Host.findById(decoded.id).select('-password -hostPin');
    }

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // attach full user/host
    next();
  } catch (err) {
    console.error('Token error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-based access control
exports.protectRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};

// Optional middleware (attach user if token is present)
exports.optional = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user;

      if (decoded.role === 'user') {
        user = await User.findById(decoded.id).select('-password');
      } else if (decoded.role === 'host') {
        user = await Host.findById(decoded.id).select('-password -hostPin');
      }

      if (user) req.user = user;
    }
  } catch (err) {
    // Silent fail – no user attached
  }
  next();
};
