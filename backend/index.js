const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const userRegRoutes = require("./routes/userRegRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/user", userRegRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
