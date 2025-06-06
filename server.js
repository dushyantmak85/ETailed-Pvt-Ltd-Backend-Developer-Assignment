/* 
 1. This server listens on port 3000.
 2. To make request first start the server using `node server.js` and then you can use tools like Postman or RapidAPI Client to test the endpoints.
 3. Make sure to have MongoDB running and the database `RegisterDatabase` created.
 4. http://localhost:3000 is the base URL to make requests.
  */

require("dotenv").config();
const express=require("express");
const app=express();
const mongoose = require('mongoose');
const User= require("./models/UserModel"); // Importing User model
const AuthenticateToken = require("./middleware/AuthenticateToken");

// Importing routes
const dashboardRoutes = require('./routes/dashboard-summary');
const profileRoutes = require('./routes/Updateprofile');
const loginRoutes = require('./routes/login');
const preferenceRoutes = require('./routes/preferences');
const registerRoutes = require('./routes/register');

mongoose.connect("mongodb://127.0.0.1:27017/RegisterDatabase");
app.use(express.json());


// User registration handler
app.use('/register', registerRoutes);

// User login handler
app.use('/login', loginRoutes);


// Protected route to get user profile
app.get("/profile",AuthenticateToken,async (req,res)=>{          
    const user = await User.findById(req.user.id); // Find user by ID from the JWT token
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});

//  Handling preferences route
app.use('/preferences', preferenceRoutes); 

// Handling dashboard-summary  route
app.use('/dashboard-summary', dashboardRoutes);

// Handling profile update route
app.use('/profile', profileRoutes); 

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
