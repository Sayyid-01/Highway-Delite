const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  slots: [{
    date: { type: String, required: true },
    time: { type: String, required: true },
    available: { type: Boolean, default: true },
    slotsLeft: { type: Number, default: 0 }
  }]
});

module.exports = mongoose.model('Experience', experienceSchema);