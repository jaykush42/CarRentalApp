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
