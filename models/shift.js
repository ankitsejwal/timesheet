const mongoose = require("mongoose");

// set global option to remove warnings in terminal
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect("mongodb://localhost/security-timesheet")
  .then("connected to db.")
  .catch((err) => err);

const shiftSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  day: String,
  location: String,
  employee: {
    name: String,
    email: String,
  },
  timming: {
    start: Date,
    end: Date,
    total: Number,
  },
});

module.exports = mongoose.model("Shift", shiftSchema);
