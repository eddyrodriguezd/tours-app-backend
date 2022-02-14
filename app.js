const express = require("express");
const user = require("./routes/userRoute");
const app = express();
app.use(express.json());
app.use("/api/", user);
module.exports = app;
