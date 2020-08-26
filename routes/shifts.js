const express = require("express");
const mongoose = require("mongoose");
const Shift = require("../models/shift");

const router = express.Router();

// Get all shifts
router.get("/", (req, res) => {
  (async function getShifts() {
    res.send(await Shift.find());
  })();
});

// Get a shift
router.get("/:id", (req, res) => {
  const id = req.params.id;

  (async function getShift() {
    const result = await Shift.find({ location: id });
    res.send(result);
  })();
});

// Post a shift
router.post("/", (req, res) => {});

// update a shift
router.put("/:id", (req, res) => {});

// delete a shift
router.delete("/:id", (req, res) => {});

module.exports = router;
