// Schema for user preferences
const mongoose = require('mongoose');
const PreferenceSchema = new mongoose.Schema({ 
  userId: String,         // Link to the user
  theme: String,
  layout: String,
});
module.exports= mongoose.model("Preference", PreferenceSchema);
