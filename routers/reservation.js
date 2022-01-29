const express = require('express');

const reservationController = require('../controller/reservation');

const api = express.Router();

api.post("/create", reservationController.registerReservation);
api.get("/getAll", reservationController.getReservationsByUser);

module.exports = api;