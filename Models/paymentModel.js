const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  stripeSessionId: {
    type: String,
    required: true,
    unique: true,
  },

  paymentIntentId: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: "usd",
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Paid",
  },

  paymentMethod: {
    type: String,
    default: "card",
  },

  paidAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", schema);
