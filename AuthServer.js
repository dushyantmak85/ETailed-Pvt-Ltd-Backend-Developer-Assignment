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

//User login route handler
app.post("/login",(req,res)=>{
    // Authenticate user
    const username= req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken:accessToken });
})

//Register a new user
app.post("/register", function(req, res){
  User.register({username:req.body.username},req.body.password,function(err){
    if(err){
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    }
  });
});



app.listen(4000);