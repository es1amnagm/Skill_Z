const mongoose = require("mongoose");
  
// Audit document stores who did what and from where, for traceability.
const schema = mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},
  action: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  metaData: {
    type: String,
  },
  // Request origin details captured with the audit event.
    ip: String,

  userAgent: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Audit",schema);
