const express = require('express');
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');
const { validateBooking } = require('../middleware/validation');
const router = express.Router();

router.post('/bookings', validateBooking, async (req, res) => {
  try {
    const { experienceId, user, slot, promoCode, totalPrice } = req.body;
  

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      console.log('Experience not found for ID:', experienceId);  
      return res.status(404).json({ error: 'Experience not found' });
    }

    const slotIndex = experience.slots.findIndex(s => s.date === slot.date && s.time === slot.time);
    if (slotIndex === -1 || !experience.slots[slotIndex].available) {

      return res.status(400).json({ error: 'Slot unavailable' });
    }

    // Calculate discount
    let discount = 0;
    if (promoCode === 'SAVE10') discount = experience.price * 0.1;
    else if (promoCode === 'FLAT100') discount = 100;
    const finalPrice = Math.max(0, totalPrice - discount);  

    const booking = new Booking({
      experienceId,
      user,
      slot,
      promoCode,
      totalPrice: finalPrice,
    });

    const savedBooking = await booking.save(); 
    console.log('Booking saved:', savedBooking); 

    
    experience.slots[slotIndex].available = false;
    await experience.save();
    console.log('Slot updated for experience:', experienceId);

    res.json({ message: 'Booking confirmed', bookingId: savedBooking._id });
  } catch (err) {
    console.error('Booking error:', err);  
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
