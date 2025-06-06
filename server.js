// This server listens on port 3000 and provides a profile endpoint and preferences endpoint that requires authentication via JWT.

require("dotenv").config();
const express=require("express");
const app=express();
const mongoose = require('mongoose');
const User= require("./models/UserModel"); // Importing User model
const Preference = require("./models/PreferencesModel"); // Importing the Preferences model

const jwt=require("jsonwebtoken");
app.use(express.json());

// Importing routes
const dashboardRoutes = require('./routes/dashboard-summary');
const profileRoutes = require('./routes/profile');

mongoose.connect("mongodb://127.0.0.1:27017/RegisterDatabase");



// Protected route to get user profile
app.get("/profile",AuthenticateToken,async (req,res)=>{          
    const user = await User.findById(req.user.id); // Find user by ID from the JWT token
    if (!user) return res.status(404).send("User not found");
    res.json(user);
});


function AuthenticateToken(req,res,next){ // Middleware to authenticate JWT token

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

 // Endpoint to save user preferences

app.post("/preferences", AuthenticateToken, async (req, res) => {
  const { theme, layout } = req.body;
  const userId = req.user.id;

  let preference = await Preference.findOne({ userId });
  if (preference) 
    {
    preference.theme = theme;
    preference.layout = layout;
    } 
  else 
    {
      preference = new Preference({ userId, theme, layout });
    }

    await preference.save();
    res.send("Preferences saved.");

});

// Endpoint to get user preferences

app.get("/preferences", AuthenticateToken, async (req, res) => {
  const userId = req.user.id;

  const preference = await Preference.findOne({ userId });
  if (!preference) {
    return res.status(404).send("No preferences found.");
  }
  res.json(preference);  
});


// Using  routes
app.use('/api', dashboardRoutes);
app.use('/api', profileRoutes);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
