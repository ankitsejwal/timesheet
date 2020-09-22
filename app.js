const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// connect to database
mongoose
  .connect("mongodb://localhost/timesheet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("connected to db"))
  .catch((err) => err);

// middlewares
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("/public"));

// import routes
const index = require("./routes");
const employees = require("./routes/employees");
const shifts = require("./routes/shifts");
const timesheets = require("./routes/shifts");
const locations = require("./routes/locations");

// paths
app.use("/", index);
app.use("/employees", employees);
app.use("/shifts", shifts);
app.use("/timesheets", timesheets);
app.use("/locations", locations);

app.listen(process.env.PORT || 3000);
