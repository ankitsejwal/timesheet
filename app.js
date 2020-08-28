const express = require("express");
const users = require("./routes/users");
const shifts = require("./routes/shifts");
const bodyParser = require("body-parser");

const app = express();

// middlewares
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/shifts", shifts);

app.listen(4002);
