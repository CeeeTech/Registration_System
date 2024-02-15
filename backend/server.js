// app.js

const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/students");

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://techceee:techceee@stc-crm.zts10yh.mongodb.net/",
  {}
);

// Routes
app.use("/students", studentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
