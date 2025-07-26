const bcrypt = require('bcryptjs');

/**
 * Hash a plain text password.
 */
exports.hashPassword = async (plainText) => {
  return await bcrypt.hash(plainText, 10);
};

/**
 * Compare a plain password with hashed password.
 */
exports.comparePasswords = async (input, hashed) => {
  return await bcrypt.compare(input, hashed);
};
