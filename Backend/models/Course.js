const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"] },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Store image URL
    courseDate: { type: Date, required: true }, // Each course must have a date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
