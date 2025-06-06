
require("dotenv").config();
const express=require("express");

const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const User = require("../models/UserModel");
const router = express.Router();


//User login handler
router.post("/",async (req,res)=>{
    // Authenticate user
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials.");

    //  Creating JWT with real ID
    const payload = { id: user._id, name: user.name };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.json({ accessToken:accessToken }); // Sending the access token back to the client
  
})

// Exporting the router
module.exports = router;