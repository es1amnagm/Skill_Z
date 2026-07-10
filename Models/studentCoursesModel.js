const mongoose = require("mongoose");
const schema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  rate: Number,
  rateText: String,
});

module.exports = mongoose.model("studentCourses", schema);
