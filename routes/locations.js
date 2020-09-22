const express = require("express");
const { findByIdAndDelete } = require("../models/location");
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
      id: req.query.id,
    });
  } catch {
    res.redirect("/locations");
  }
});

// Add a location
router.post("/", async (req, res) => {
  const location = new Location({
    location: req.body.location,
  });
  await location.save();
  res.redirect("/locations");
});

// Edit locations
router.post("/edit", async (req, res) => {
  try {
    await Location.findByIdAndUpdate(req.body.id, {
      $set: { location: req.body.location },
    });
    res.redirect("/locations");
  } catch (err) {
    console.error(err);
    res.send("could not update");
  }
});

// delete location
router
  .get("/delete", async (req, res) => {
    let searchOptions = {};
    if (req.query.location) {
      searchOptions.location = new RegExp(req.query.location);
    }

    const locations = await Location.find(searchOptions);
    res.render("locations/delete", {
      title: "All locations",
      locations: locations,
      searchOptions: req.query,
    });
  })
  .post("/delete", async (req, res) => {
    try {
      await Location.findByIdAndDelete(req.body.id);
      res.redirect("/locations/delete");
    } catch (err) {
      console.error(err);
      res.send("could not delete");
    }
  });

module.exports = router;
