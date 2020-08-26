const express = require("express");
const shifts = require("./routes/shifts");

const app = express();

// middlewares

app.use("/api/", shifts);

app.listen(4000);
