const express = require('express');
const {
  getRegistrations, // Corrected function name
  getRegistration, // Corrected function name
  updateRegistration // Corrected function name
} = require('../controllers/registationController'); // Corrected controller name

const router = express.Router();

// GET all registrations
router.get('/', getRegistrations); // Updated function name

// GET a single registration
router.get('/:id', getRegistration); // Updated function name

// UPDATE a registration
router.patch('/:id', updateRegistration); // Updated function name

module.exports = router;
//change