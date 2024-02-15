const UserReg = require("../models/userRegModel");

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserReg.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
