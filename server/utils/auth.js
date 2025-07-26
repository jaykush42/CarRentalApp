const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT for a user.
 */
exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      contactNumber: user.contactNumber
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};
