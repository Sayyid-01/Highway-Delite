const express = require('express');
const router = express.Router();

router.post('/promo/validate', (req, res) => {
  const { code } = req.body;
  if (code === 'SAVE10') res.json({ valid: true, discount: 0.1 });
  else if (code === 'FLAT100') res.json({ valid: true, discount: 100 });
  else res.json({ valid: false });
});

module.exports = router;