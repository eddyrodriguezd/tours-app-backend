const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config({ path: ".env" });
require("./config/dbConfig");

//Load routes
const reservationRoutes = require("./routes/reservation");
const categoriesRoutes = require("./routes/categories");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8080, () => {
  console.log("App listening on port", process.env.PORT || 8080);
});

//Router
app.use(`/api/reservation`, reservationRoutes);
app.use("/api", categoriesRoutes);

//module.exports = app;
