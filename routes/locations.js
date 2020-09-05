const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// Get all locations
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.location) {
    searchOptions.location = new RegExp(req.query.location);
  }

  const locations = await Location.find(searchOptions);
  res.render("locations/index", {
    locations: locations,
    searchOptions: req.query,
  });
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
