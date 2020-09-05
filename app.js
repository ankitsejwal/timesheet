const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: false }));

// import routes
const index = require("./routes");
const employees = require("./routes/employees");
const shifts = require("./routes/shifts");
const timesheets = require("./routes/shifts");
const locations = require("./routes/locations");

// set global option to remove warnings in terminal
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb://localhost/timesheet")
  .then(console.log("connected to db"))
  .catch((err) => err);

// middlewares
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("/public"));

// paths
app.use("/", index);
app.use("/employees", employees);
app.use("/shifts", shifts);
app.use("/timesheets", timesheets);
app.use("/locations", locations);

app.listen(4000);
