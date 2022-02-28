const express = require("express");

const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const ReservationController = require("../controllers/ReservationController");

const api = express.Router();

api.post("/create", isAuthenticateUser, ReservationController.register);
api.get("/fetch", isAuthenticateUser, ReservationController.retrieveByUser);

module.exports = api;
