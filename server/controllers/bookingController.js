// server/controllers/bookingController.js
const Booking = require("../models/Booking");
const BookingManager = require("../services/bookingCar/bookingManager");
const { overlappingBooking } = require("../utils/validateOverlappingBooking");


// Get all bookings by user
exports.getBookings = async (req, res) => {
  try {
    const userId = req.query.userId || req.user._id; 
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bookings = await Booking.find({ userId });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {

    const { id } = req.params;


    if (!id) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    const booking = await Booking.findById(id).populate("car.carId")
      .populate("userId")
      .populate("hostId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    } 
    

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings by host ID 
exports.getBookingsByHostId = async (req, res) => {
  try {
    const hostId = req.query.hostId || req.user._id;

    if (!hostId) {
      return res.status(400).json({ message: "Host ID is required" });
    }

    const bookings = await Booking.find({ hostId });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create booking 
exports.addBooking = async (req, res) => {
  try {
    
    const data = req.body;

    const strategyType = "atomic";
    
    const booking = await BookingManager.createBooking(
      data,
      strategyType
    );

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Booking 
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check for overlapping bookings
exports.checkBookingOverlap = async (req, res) => {
  const { car, startDate, endDate } = req.body;

  const result = await overlappingBooking(
    car,
    startDate,
    endDate,
  );

  return res.status(200).json(result);
};

