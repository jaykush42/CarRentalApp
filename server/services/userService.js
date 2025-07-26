// services/userService.js

const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const { hashPassword, comparePasswords } = require('../utils/hash');

exports.registerUser = async ({ name, email, password, contactNumber, city, role = 'user' }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        contactNumber,
        city,
        role,
    });

    const token = generateToken(newUser);
    return { user: newUser, token };
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken(user);
    return { user, token };
};

exports.updateUser = async (userId, updates) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: true, runValidators: true }
    );
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const isMatch = await comparePasswords(currentPassword, user.password);
    if (!isMatch) throw new Error('Current password is incorrect');

    const hashed = await hashPassword(newPassword);
    user.password = hashed;
    await user.save();
    return user;
};

exports.getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');
    return user;
};