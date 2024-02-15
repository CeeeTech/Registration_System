const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
