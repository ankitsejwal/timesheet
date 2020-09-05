const mongoose = require("mongoose");
const Joi = require("joi");

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
