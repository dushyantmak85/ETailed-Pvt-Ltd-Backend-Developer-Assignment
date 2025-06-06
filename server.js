// This server listens on port 3000 and provides a profile endpoint and preferences endpoint that requires authentication via JWT.

require("dotenv").config();
const express=require("express");
const app=express();
const mongoose = require('mongoose');
const User= require("./models/UserModel"); // Importing User model
const AuthenticateToken = require("./middleware/AuthenticateToken");

app.use(express.json());

// Importing dashboard and profile routes
const dashboardRoutes = require('./routes/dashboard-summary');
const profileRoutes = require('./routes/Updateprofile');

mongoose.connect("mongodb://127.0.0.1:27017/RegisterDatabase");



// Protected route to get user profile
app.get("/profile",AuthenticateToken,async (req,res)=>{          
    const user = await User.findById(req.user.id); // Find user by ID from the JWT token
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});

// Importing and handling preferences route
const preferenceRoutes = require('./routes/preferences');
app.use('/preferences', preferenceRoutes);

// User login handler
const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);

// User registration handler
const registerRoutes = require('./routes/register');
app.use('/register', registerRoutes);

 

// Using  routes
app.use('/dashboard-summary', dashboardRoutes);
app.use('/profile', profileRoutes); // Update email or name

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
