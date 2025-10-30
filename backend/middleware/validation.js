const validateBooking = (req, res, next) => {
  const { experienceId, user, slot } = req.body;
  if (!experienceId || !user.name || !user.email || !user.phone || !slot.date || !slot.time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  next();
};

module.exports = { validateBooking };