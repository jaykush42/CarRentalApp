// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  contactNumber: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/
  },
  city: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user'], immutable: true  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
