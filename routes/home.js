const express = require("express");
const router = express.Router();

// Get '/' route
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
