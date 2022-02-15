const express = require("express");

const { getTours, registerTour } = require("../controllers/TourController");

const api = express.Router();

api.post("/create", registerTour);
api.get("/fetch", getTours);

module.exports = api;
