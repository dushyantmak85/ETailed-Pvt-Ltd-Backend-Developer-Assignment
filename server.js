// This server listens on port 3000 and provides a profile endpoint that requires authentication via JWT.

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
const User=new mongoose.model("User",UserSchema);

const posts=[
    {
        "name":"dushyant",
        "postnumber":1
    },
    {
        "name":"karni",
        "postnumber":2
    }
]

app.get("/profile",AuthenticateToken,(req,res)=>{ // To get profile info, requires authentication

    // The AuthenticateToken middleware will check the JWT token
    res.json(posts.filter(post=>post.name==req.user.name)); // Filter posts by authenticated user
});


function AuthenticateToken(req,res,next){ // Middleware to authenticate JWT token

    // Check for the token in the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
