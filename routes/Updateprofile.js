// This file handles user profile updates by authenticating the jwt token

const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); 
const AuthenticateToken = require('../middleware/AuthenticateToken'); 


router.patch('/',AuthenticateToken, async (req, res) => {
    const { NewName, NewEmail } = req.body;
    const userId = req.user.id;


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Checking if at least one field is provided for update
    if (!NewName && !NewEmail) {
      return res.status(400).json({ message: "No updates provided" });
    }

    if(NewName) user.name = NewName; // Updating the user's name if provided
    if(NewEmail) user.email = NewEmail; // Updating the user's email if provided

    await user.save();

    res.json({
      message: "Profile updated successfully",
      updatedUser: { name: user.name, email: user.email }
    });
  
});

module.exports = router;
