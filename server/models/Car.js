const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Host',
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
    unique: true
  },
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
  driver: {
    availability: { type: Boolean, default: false },
    pricePerDay: { type: Number, default: 0 }
  },
  rating: { type: Number, default: 3 },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Car', carSchema);
