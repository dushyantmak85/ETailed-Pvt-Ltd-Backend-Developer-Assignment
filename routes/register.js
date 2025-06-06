require("dotenv").config();
const express=require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require("../models/UserModel");


//Register a new user
router.post("/", async (req, res) => {
  const { email, password, name } = req.body;

  if(!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validating email
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);// Hashing the password before saving using bcrypt
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.status(201).send("User registered successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user.");
  }
});

module.exports = router;