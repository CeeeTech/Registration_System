const express = require("express");
const router = express.Router();

const userRegController = require("../controllers/userRegController");

router.post("/", userRegController.createUser);

module.exports = router;
