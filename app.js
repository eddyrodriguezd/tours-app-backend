const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const reservation = require("./routes/reservation");
const user = require("./routes/user");
const categories = require("./routes/categories");
const tours = require("./routes/tour");
const destinies = require("./routes/destiny");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/reservation", reservation);
app.use("/api/", user);
app.use("/api/category", categories);
app.use("/api/tour", tours);
app.use("/api/destiny", destinies);

module.exports = app;
