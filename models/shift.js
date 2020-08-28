const mongoose = require("mongoose");

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
  },
  employee: {
    name: String,
    email: String,
  },
  time: {
    start: Date,
    end: Date,
    total: Number,
  },
  location: String,
});

module.exports = mongoose.model("Shift", shiftSchema);
