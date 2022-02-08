const express = require('express');

const middleware_auth = require('../middleware/auth');
const ReservationController = require('../controllers/ReservationController');

const api = express.Router();

api.post("/create", ReservationController.registerReservation);
api.get("/fetch", [middleware_auth.checkAuth], ReservationController.retrieveReservationsByUser);

module.exports = api;