const express = require("express");
const home = require("./routes/home");
const users = require("./routes/users");
const shifts = require("./routes/shifts");
const bodyParser = require("body-parser");
const pug = require("pug");
const joi = require("joi");

const app = express();

// middlewares
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());

// routes middlewares
app.use("/", home);
app.use("/api/users", users);
app.use("/api/shifts", shifts);

app.listen(4002);
