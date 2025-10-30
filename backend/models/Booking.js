const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  experienceId: { type: String, ref: 'Experience', required: true },  // Changed to String to match Experience _id
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  slot: {
    date: { type: String, required: true },
    time: { type: String, required: true }
  },
  promoCode: { type: String },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'failed'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', bookingSchema);