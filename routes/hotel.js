const express = require("express");

const { isAuthenticateUser } = require("../middleware/auth");
const HotelController = require("../controllers/HotelController");

const api = express.Router();

api.post("/fetch", HotelController.fetchByCity);

module.exports = api;
