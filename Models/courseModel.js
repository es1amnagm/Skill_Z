const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  instructorId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  videoUrls: [
    {
      url: String,
      title: String,
      duration: Number,
    },
  ],
  state: {
    type: String,
    enum: ["Waiting", "Accepted", "Rejected"],
    default: "Waiting",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Course", schema);
