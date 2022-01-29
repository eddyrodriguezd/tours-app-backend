const express = require('express');

const app = express();

//Load routes
const reservationRoutes = require('./routers/reservation');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router
app.use(`/api/reservation`, reservationRoutes);

module.exports = app;