const express = require("express");
const router = express.Router();
const Location = require("../models/location");
const { findOneAndUpdate } = require("../models/location");

// Get all locations
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.location) {
    searchOptions.location = new RegExp(req.query.location);
  }

  const locations = await Location.find(searchOptions);
  res.render("locations/index", {
    title: "All locations",
    locations: locations,
    searchOptions: req.query,
  });
});

// Get create new location page
router.get("/new", (req, res) => {
  res.render("locations/new", { title: "new location" });
});

// Get edit route
router.get("/edit", async (req, res) => {
  try {
    const location = await Location.findById(req.query.id);
    res.render("locations/edit", {
      title: "edit location",
      location: location,
    });
  } catch {
    res.redirect("/locations");
  }
});

// Edit locations
router.post("/edit", async (req, res) => {
  try {
    const id = {
      id: req.body.id,
    };
    const newLocation = req.body.location;
    console.log(req.query.id);
    console.log(newLocation);

    await findOneAndUpdate(id, newLocation);
  } catch {
    console.log("error saving edits");
  }
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
