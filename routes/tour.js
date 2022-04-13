const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const express = require("express");
const { isAuthenticateUser } = require("../middleware/auth");

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

const {
  getTours,
  registerTour,
  findTour,
} = require("../controllers/TourController");

const api = express.Router();

api.post("/create", isAuthenticateUser, upload.any("images"), registerTour);
//api.post("/findTour", isAuthenticateUser, authorizeRoles("admin"), findTour);
api.get("/fetch", getTours);

module.exports = api;
