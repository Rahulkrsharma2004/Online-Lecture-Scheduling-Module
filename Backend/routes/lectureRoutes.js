const express = require('express');
const { getLectures, scheduleLecture } = require('../controllers/lectureController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getLectures);
router.post('/schedule', protect, adminOnly, scheduleLecture);

module.exports = router;
