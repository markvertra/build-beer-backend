const express = require('express');
const router = express.Router();

const beer = require('./beer');
const order = require('./order');

router.use('/beer', beer);
router.use('/order', order);

module.exports = router;
