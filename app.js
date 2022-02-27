const express = require("express");
const cookieParser = require("cookie-parser");
const reservation = require("./routes/reservation");
const user = require("./routes/userRoute");
const categories = require("./routes/categories");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/reservation", reservation);
app.use("/api/", user);
app.use("/api/category", categories);

module.exports = app;
