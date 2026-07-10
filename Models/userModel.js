const mongoose = require("mongoose");
const validator = require("validator");
let schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },

  birthDate: Date,

  role: {
    type: String,
    required: true,
    default: "Student",
    enum: ["Student", "Instructor", "Admin"],
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  }

});
 
module.exports = mongoose.model("User", schema);
