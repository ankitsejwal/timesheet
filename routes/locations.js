const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// Get location
router.get("/", (req, res) => {
  res.render("locations/index");
});

// Get create new location page
router.get("/new", (req, res) => {
  res.render("locations/new");
});

// Post a location
router.post("/", async (req, res) => {
  const location = new Location({
    location: req.body.location,
  });
  await location.save();
  res.redirect("/locations");
});

module.exports = router;
