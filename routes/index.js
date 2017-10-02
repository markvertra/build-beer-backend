const express      = require('express');
const router       = express.Router();
const apiRoutes    = require('./api/index');
const authRoutes = require('./auth/index');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;