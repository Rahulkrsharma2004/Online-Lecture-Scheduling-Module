const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: String },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Lecture", LectureSchema);
