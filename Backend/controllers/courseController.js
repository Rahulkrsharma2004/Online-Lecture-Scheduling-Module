const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCourse = async (req, res) => {
  const { name, level, description, image, courseDate } = req.body;

  try {
    // Validate input
    if (!name || !level || !description || !image || !courseDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Ensure the date is not in the past
    const today = new Date();
    if (new Date(courseDate) < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ success: false, message: "Course date cannot be in the past" });
    }

    // Create new course
    const course = new Course({ name, level, description, image, courseDate });

    await course.save();

    res.status(201).json({ success: true, message: "Course added successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { getCourses, addCourse };
