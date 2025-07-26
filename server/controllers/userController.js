
const userService = require('../services/userService');

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, contactNumber, city, role, providesDriver, hostPin } = req.body;
        const { user, token } = await userService.registerUser({ name, email, password, contactNumber, city, role, providesDriver, hostPin });
        res.status(201).json({ result: user, token });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, role, hostPin } = req.body;
        const { user, token } = await userService.loginUser({ email, password, role, hostPin });
        res.status(200).json({ result: user, token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updated = await userService.updateUser(req.user.id, req.body);
        res.status(200).json({ message: 'Profile updated', result: updated });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        await userService.changePassword(req.user.id, currentPassword, newPassword);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error('Get Profile Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
