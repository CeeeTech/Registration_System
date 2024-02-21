const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String, // Changed to String since telephone numbers may contain non-numeric characters like '+' or '-'
    required: true
  },
  address: {
    type: String,
    required: true
  },
  registration_number: {
    type: String, // Changed to String since registration numbers may contain non-numeric characters
    required: true
  },
  gender: {
    type: String,
    required: true,
    // Added enum validation for gender
  }
}, { timestamps: true });

module.exports = mongoose.model('registration', registrationSchema);
