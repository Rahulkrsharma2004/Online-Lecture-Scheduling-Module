const Lecture = require('../models/Lecture');
const User = require('../models/User');
const Course = require('../models/Course');

const getLectures = async (req, res) => {
  try {
    let lectures;
    if (req.user.role === 'admin') {
      lectures = await Lecture.find().populate('course').populate('instructor');
    } else {
      lectures = await Lecture.find({ instructor: req.user.id }).populate('course');
    }
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const scheduleLecture = async (req, res) => {
  const { courseId, instructorId, title, videoUrl, duration, date } = req.body;

  try {
    if (!courseId || !instructorId || !title || !videoUrl || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return res.status(400).json({ success: false, message: "Invalid instructor" });
    }

    // Ensure the lecture date matches the course date
    if (new Date(date).toDateString() !== new Date(course.courseDate).toDateString()) {
      return res.status(400).json({
        success: false,
        message: "Lecture date must match the assigned course date",
      });
    }

    // Check if the instructor already has a lecture on the same date
    const existingLecture = await Lecture.findOne({ instructor: instructorId, date });
    if (existingLecture) {
      return res.status(400).json({
        success: false,
        message: "Instructor already has a lecture scheduled on this date",
      });
    }

    // Create and save the lecture
    const newLecture = new Lecture({
      course: courseId,
      instructor: instructorId,
      title,
      videoUrl,
      duration,
      date,
    });

    await newLecture.save();

    res.status(201).json({ success: true, message: "Lecture scheduled successfully", newLecture });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
module.exports = { getLectures, scheduleLecture };
