// Endpoint to save user preferences
const Preference = require("../models/PreferencesModel"); // Importing the Preferences model
const AuthenticateToken = require("../middleware/AuthenticateToken"); // Importing the authentication middleware
const express = require("express");
const router= express.Router();

router.post("/", AuthenticateToken, async (req, res) => {
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
      preference = new Preference({ userId, theme, layout }); // Creating  userId field to link preferences to the user
    }

    await preference.save();
    res.send("Preferences saved.");

});

// Endpoint to get user preferences

router.get("/", AuthenticateToken, async (req, res) => {
  const userId = req.user.id;

  const preference = await Preference.findOne({ userId });
  if (!preference) {
    return res.status(404).send("No preferences found.");
  }
  res.json(preference);  
});

module.exports = router; // Exporting the router to use in server.js