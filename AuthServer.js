// Description: This code sets up a simple authentication server using Express and Mongoose. And runs on Port 4000

require("dotenv").config();
const express=require("express");
const app=express();
const mongoose = require('mongoose');

const jwt=require("jsonwebtoken");
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");

const UserSchema=new mongoose.Schema({
  email:String,
  password:String, 
  name:String
});

const User = mongoose.model("User", UserSchema);

//User login route handler
app.post("/login",(req,res)=>{
    // Authenticate user
    const username= req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken:accessToken }); // Sending the JWT token back to the client
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