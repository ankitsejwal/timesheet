const express = require("express");
const { Shift, validate } = require("../models/timesheet");

const router = express.Router();

// Get all shifts
router.get("/", async (req, res) => {
  const result = await Shift.find().populate("employee");
  res.send(result);
});

// Get a shift
router.get("/:id", async (req, res) => {
  const result = await Shift.find({ location: req.params.id });
  res.send(result);
});

// Post a shift
router.post("/", (req, res) => {});

// update a shift
router.put("/:id", (req, res) => {});

// delete a shift
router.delete("/:id", (req, res) => {});

module.exports = router;
