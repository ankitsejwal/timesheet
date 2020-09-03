const mongoose = require("mongoose");
const Joi = require("joi");

const shiftSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  time: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    total: Number,
    required: true,
  },
  location: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
  },
});

const Shift = mongoose.model("Shift", shiftSchema);

const validate = (shift) => {
  const schema = Joi.object({
    time: Joi.date().required(),
  });

  return schema.validate(shift);
};

module.exports = { Shift, validate };
