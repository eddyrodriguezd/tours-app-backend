const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const { getTours, registerTour } = require("../controllers/TourController");

const api = express.Router();

api.post("/create", upload.any("images"), registerTour);
api.get("/fetch", getTours);

module.exports = api;
