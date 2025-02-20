const express = require('express');
const { getCourses, addCourse, deleteCourse } = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getCourses);
router.post('/add', protect, adminOnly, addCourse);

module.exports = router;
