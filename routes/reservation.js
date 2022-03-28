const express = require("express");

const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const ReservationController = require("../controllers/ReservationController");
const HotelController = require("../controllers/HotelController");

const api = express.Router();

api.post("/create", isAuthenticateUser, ReservationController.register);
api.get("/fetch", isAuthenticateUser, ReservationController.retrieveByUser);

api.post("/hotels/fetch", isAuthenticateUser, HotelController.fetchByCity);

module.exports = api;
