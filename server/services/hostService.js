// server/services/hostService.js
const Host = require('../models/Host');
const { hashPassword, comparePasswords } = require('../utils/hash');
const { generateToken } = require('../utils/auth');

exports.registerHost = async ({ name, email, password, contactNumber, city, hostPin }) => {
  if (!name || !email || !password || !contactNumber || !city || !hostPin)
    throw new Error('All fields are required');

  const existing = await Host.findOne({ email });
  if (existing) throw new Error('Host already exists');

  const hashedPassword = await hashPassword(password);
  const hashedPin = await hashPassword(hostPin);

  const newHost = await Host.create({
    name,
    email,
    password: hashedPassword,
    contactNumber,
    city,
    hostPin: hashedPin,
    role,
  });

  const token = generateToken(newHost);
  return { host: newHost, token };
};

exports.loginHost = async ({ email, password, hostPin }) => {
  const host = await Host.findOne({ email });
  if (!host) throw new Error('Host not found');

  const passwordMatch = await comparePasswords(password, host.password);
  const pinMatch = await comparePasswords(hostPin, host.hostPin);

  if (!passwordMatch || !pinMatch) throw new Error('Invalid credentials');

  const token = generateToken(host);
  return { host, token };
};

exports.updateHost = async (hostId, data) => {
   const updatedHost = await Host.findByIdAndUpdate(
          hostId,
          data,
          { new: true, runValidators: true }
      );
      if (!updatedHost) throw new Error('User not found');
      return updatedHost;
};

exports.changePassword = async (hostId, currentPassword, newPassword) => {
  const host = await Host.findById(hostId);
  if (!host) throw new Error('Host not found');

  const match = await comparePasswords(currentPassword, host.password);
  if (!match) throw new Error('Incorrect current password');

  host.password = await hashPassword(newPassword);
  await host.save();

  return host;
};

exports.changeHostPin = async (hostId, currentHostPin, newHostPin) => {
  const host = await Host.findById(hostId);
  if (!host) throw new Error('Host not found');

  const match = await comparePasswords(currentHostPin, host.hostPin);
  if (!match) throw new Error('Incorrect current host pin');

  host.hostPin = await hashPassword(newHostPin);
  await host.save();

  return host;
};

exports.getHostById = async (id) => {
  return await Host.findById(id).select('-password -hostPin');
};

exports.getHostProfile = async (hostId) => {
  const host = await Host.findById(hostId).select('-password -hostPin');
  if (!host) throw new Error('Host not found');
  return host;
};
