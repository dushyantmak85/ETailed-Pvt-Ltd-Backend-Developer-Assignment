const express = require('express');
const router = express.Router();

router.get('/dashboard-summary', (req, res) => {
  const data = {
    team: [
      { id: 1, name: "Dushyant", role: "Developer" },
      { id: 2, name: "Karni", role: "Designer" },
    ],
    projects: [
      { id: 101, title: "Anantya", status: "In Progress" },
      { id: 102, title: "Ocean Explorer", status: "Completed" },
    ],
    notifications: [
      { id: 1, message: "New user joined", timestamp: "2025-06-06T10:00:00Z" },
      { id: 2, message: "Project deadline approaching", timestamp: "2025-06-07T12:00:00Z" },
    ]
  };

  res.json(data);
});

module.exports = router;

// This code defines a route for fetching a dashboard summary, including team members, projects, and notifications.