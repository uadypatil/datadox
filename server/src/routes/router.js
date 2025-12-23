const express = require('express');
const router = express.Router();

// Import specific routes from their respective files
// Example: Assuming you create 'src/routes/userRoutes.js' and 'src/routes/authRoutes.js'
// const userRoutes = require('./userRoutes');
// const authRoutes = require('./authRoutes');

router.get('/data', (req, res) => {
  res.status(200).json({ status: 'API is healthy and running' });
});


// Example placeholder route
router.get('/status', (req, res) => {
  res.status(200).json({ status: 'API is healthy and running' });
});

// Mount specific route modules
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

module.exports = router;
