const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  city: String,
  make: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  category: String,
  image: String,
  seats: Number,
  doors: Number,
  transmission: String,
  fuel: String,
  mileage: Number,
  rating: { type: Number, default: 3 },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Car', carSchema);
