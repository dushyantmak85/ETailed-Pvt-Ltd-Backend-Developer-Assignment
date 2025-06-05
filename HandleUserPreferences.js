// Description: This code sets up a simple  server using Express and Mongoose to manage User Preferences. And runs on Port 4000

require("dotenv").config();
const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const jwt=require("jsonwebtoken");
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/RegisterDatabase");

const UserSchema=new mongoose.Schema({
  email:String,
  password:String, 
  name:String
});

const User = mongoose.model("User", UserSchema);