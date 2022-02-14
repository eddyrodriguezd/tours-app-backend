const express = require('express');

const middleware_auth = require('../middleware/auth');
const ReservationController = require('../controllers/ReservationController');

const api = express.Router();

api.post("/create", ReservationController.register);
api.get("/fetch", [middleware_auth.checkAuth], ReservationController.retrieveByUser);

module.exports = api;