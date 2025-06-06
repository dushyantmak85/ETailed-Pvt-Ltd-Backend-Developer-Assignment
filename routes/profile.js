// This file handles user profile updates

const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); 


router.patch('/profile', async (req, res) => {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required to find the user" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name; // Updating the user's name
    user.email = req.body.newEmail; // Updating the user's email if provided

    await user.save();

    res.json({
      message: "Profile updated successfully",
      updatedUser: { name: user.name, email: user.email }
    });
  
});

module.exports = router;
