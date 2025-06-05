// Description: This code sets up a simple authentication server using Express and Mongoose. And runs on Port 4000

require("dotenv").config();
const express=require("express");
const app=express();
const bcrypt = require('bcrypt');

const User = require("./models/UserModel");
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/RegisterDatabase");

const jwt=require("jsonwebtoken");
app.use(express.json());

//User login handler
app.post("/login",async (req,res)=>{
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

//Register a new user
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
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



app.listen(4000,()=>{
    console.log("Server is running on port 4000");
});