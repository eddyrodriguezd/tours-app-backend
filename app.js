const express = require("express");
var cors = require("cors");

const reservation = require("./routes/reservation");
const user = require("./routes/userRoute");
const categories = require("./routes/categories");
const tours = require("./routes/tour");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/reservation", reservation);
app.use("/api/", user);
app.use("/api/category", categories);
app.use("/api/tour", tours);

module.exports = app;
