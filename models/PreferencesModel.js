const mongoose = require('mongoose');
const PreferenceSchema = new mongoose.Schema({ // Schema for user preferences
  userId: String,         // Link to the user
  theme: String,
  layout: String,
});
module.exports= mongoose.model("Preference", PreferenceSchema);
