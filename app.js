const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const reservation = require("./routes/reservation");
const user = require("./routes/user");
const categories = require("./routes/categories");
const tours = require("./routes/tour");

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use("/api/reservation", reservation);
app.use("/api/users", user);
app.use("/api/hotel", hotel);
app.use("/api/category", categories);
app.use("/api/tour", tours);
module.exports = app;
