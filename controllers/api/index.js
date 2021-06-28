const router = require('express').Router();

const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');

// /newuser /login /logout
router.use('/users', userRoutes);

// /upload
router.use('/imageupload', imageRoutes);

module.exports = router;
