// server/controllers/hostController.js
const hostService = require("../services/hostService");

exports.signUp = async (req, res) => {
  try {
    const { host, token } = await hostService.registerHost(req.body);
    res.status(201).json({ result: host, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { host, token } = await hostService.loginHost(req.body);
    res.status(200).json({ result: host, token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.updateHost = async (req, res) => {
  try {
    const updated = await hostService.updateHost(req.user.id, req.body);
    res.status(200).json({ result: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await hostService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.changeHostPin = async (req, res) => {
  try {
    const { currentPin, newPin, confirmPin } = req.body;
    if( newPin !== confirmPin) {
      return res.status(400).json({ message: "New PIN and confirmation PIN do not match" });
    }
    await hostService.changeHostPin(req.user.id, currentPin, newPin);
    res.status(200).json({ message: "Host PIN updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getHostProfile = async (req, res) => {
  try {
    const host = await hostService.getHostById(req.user.id);
    if (!host) return res.status(404).json({ message: "Host not found" });
    res.status(200).json(host);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
