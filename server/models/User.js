const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    city: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
