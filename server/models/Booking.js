const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  car: 
    {
      carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
      title: { type: String, required: true },
      image: { type: String, required: true }
    },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalPrice: { type: Number, required: true },
  withDriver: { type: Boolean, default: false },
  driverCharge: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  billingDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  orderNotes: { type: String },
  discount: { type: Number },
  bookingType: { type: String, enum: ['single', 'bulk'], default: 'single' },
  bookingStatus: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
