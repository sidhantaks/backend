// routes/reviews.js
const express = require('express');
const router = express.Router();
const { getReviews } = require('../controllers/reviewController');

router.get('/', getReviews);

module.exports = router;