// models/Student.js

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  BOD: {
    type: Number,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
