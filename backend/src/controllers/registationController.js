const Registration = require('../models/registationModel'); // Fixed typo in model name
const mongoose = require('mongoose');

// Get all registrations
const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({}).sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single registration
const getRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such registration' });
    }
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ error: 'No such registration' });
    }
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a new student
const createStudent = async (req, res) => {
  const {first_name,   last_name,   course , email, telephone, address,registration_number, gender} = req.body

  // add to the database
  try {
    const create = await Registration.create({   first_name,   last_name,   course , email, telephone, address,registration_number, gender})
    res.status(200).json(create)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a registation
const deleteRegistation = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such deleteStudent'})
    }
  
    const deleteStudent = await Registration.findOneAndDelete({_id: id})
  
    if(!deleteStudent) {
      return res.status(400).json({error: 'No such deleteStudent'})
    }
  
    res.status(200).json(deleteStudent)
  }


// Update a registration
const updateRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid registration ID' });
    }
    const updatedRegistration = await Registration.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRegistration) {
      return res.status(404).json({ error: 'No such registration' });
    }
    res.status(200).json(updatedRegistration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {

  getRegistrations,
  getRegistration,
  createStudent,
  deleteRegistation,
  updateRegistration
};
