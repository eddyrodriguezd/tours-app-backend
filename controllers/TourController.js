const moment = require("moment");
const { addTour } = require("../services/TourService");
const Tour = require("../models/Tour");

function registerTour(req) {
  const body = req.body;

  const tour = Object.create(Tour);
  tour.title = body.title;
  tour.decription = body.description;
  tour.destination = body.destination;
  tour.category = body.category;
  tour.price = body.price;
  tour.nDays = body.nDays;
  tour.startDate = body.startDate;
  tour.endDate = body.endDate;
  tour.images = body.images;
  tour.itinerary = body.itinerary;

  addTour(tour);
}
function getTours(req, res) {
  console.log("habla manito get tours");
}

module.exports = {
  registerTour,
  getTours,
};
