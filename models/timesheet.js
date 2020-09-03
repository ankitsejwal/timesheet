const mongoose = require("mongoose");
const Joi = require("joi");

// set global option to remove warnings in terminal
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb://localhost/timesheet")
  .then("connected to db.")
  .catch((err) => err);

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
