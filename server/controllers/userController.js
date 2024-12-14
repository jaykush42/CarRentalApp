// userController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

exports.signUp = async (req, res) => {
    const { name, email, password, contactNumber, city } = req.body;
    try {

        if (!name || !email || !password || !contactNumber || !city) {
            res.status(400);
            throw new Error("Please Enter all the Fields");
        }
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await User.create({ name, email, password: hashedPassword, contactNumber, city, isAdmin: false });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id, name: newUser.name, contactNumber:newUser.contactNumber },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, { httpOnly: true }).status(201).json({ result: newUser });
        

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not Exist !!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials !!' });
        }
             const token = jwt.sign(
                { email: user.email, id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );  
                
            res.status(200).json({ result: user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.user; 
    const { name, email, contactNumber, city } = req.body;

    try {
        if (!name || !email || !contactNumber || !city) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, contactNumber, city },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', result: updatedUser });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.changePassword = async (req, res) => {
    const { id } = req.user; 
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
