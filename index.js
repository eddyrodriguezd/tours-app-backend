const express = require("express");

const app = express();
const cors = require("cors");

require("dotenv").config({
  path: ".env",
});

//Load routes
const reservationRoutes = require("./routes/reservation");
const tourRoutes = require("./routes/tour");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8080, () => {
  console.log("App listening on port 8080!");
});

//Router
app.use(`/api/reservation`, reservationRoutes);
app.use(`/api/tour`, tourRoutes);
module.exports = app;
