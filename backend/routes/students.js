/*
// routes/students.js

const express = require("express");
const router = express.Router();
const Student = require("../models/student"); // Assuming you have a Student model

// Route to add a new student
router.post("/add", async (req, res) => {
  try {
    const { name, BOD, contact, address, email } = req.body;
    const newStudent = new Student({ name, BOD, contact, address, email });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

*/

// routes/students.js

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Student = require("../models/student");

// Middleware to validate and sanitize input
const validateAndSanitize = [
  body("first_name").trim().isLength({ min: 1 }).escape(),
  body("last_name").trim().isLength({ min: 1 }).escape(),
  body("course").trim().isLength({ min: 1 }).escape(),
  body("BOD").toDate(),
  body("grade").trim().isLength({ min: 1 }).escape(), // Add validation for the 'grade' field
  body("contact").trim().isLength({ min: 1 }).escape(),
  body("address").trim().isLength({ min: 1 }).escape(),
  body("email").trim().isLength({ min: 1 }).isEmail().normalizeEmail(),
];

// Route to add a new student
router.post("/add", validateAndSanitize, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      first_name,
      last_name,
      course,
      BOD,
      grade,
      contact,
      address,
      email,
    } = req.body;
    const newStudent = new Student({
      first_name,
      last_name,
      course,
      BOD,
      grade,
      contact,
      address,
      email,
    });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
