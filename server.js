// This server listens on port 3000 and provides a profile endpoint that requires authentication via JWT.

require("dotenv").config();
const express=require("express");
const app=express();
const mongoose = require('mongoose');

const jwt=require("jsonwebtoken");
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");

const PreferenceSchema = new mongoose.Schema({ // Schema for user preferences
  userId: String,         // Link to the user
  theme: String,
  layout: String,
});
const Preference = new mongoose.model("Preference", PreferenceSchema);



app.get("/profile",AuthenticateToken,(req,res)=>{ // Endpoint to get user profile
    
    res.json(posts.filter(post=>post.name==req.user.name)); // Filter posts by authenticated user

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

app.post("/api/preferences", AuthenticateToken, async (req, res) => {
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

app.get("/api/preferences", AuthenticateToken, async (req, res) => {
  const userId = req.user.id;

  const preference = await Preference.findOne({ userId });
  if (!preference) {
    return res.status(404).send("No preferences found.");
  }

  res.json(preference);

  
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
