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

const corsOptions = {
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  origin: [
    "https://toursapp123456789.netlify.app",
    "https://sendgrid.api-docs.io",
  ],
};
app.use(cors(corsOptions));
app.use("/api/reservation", reservation);
app.use("/api/users", user);
app.use("/api/category", categories);
app.use("/api/tour", tours);
app.use("/api/destiny", destinies);
module.exports = app;
