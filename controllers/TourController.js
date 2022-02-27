const moment = require("moment");
const { addTour, getAllTours } = require("../services/TourService");
const Tour = require("../models/Tour");

async function registerTour(req, res) {
 // [images1:File]
  try {
    const body = req.body;
    console.log("----------------------------------------------");
    console.log(body.description);
    console.log("----------------------------------------------");
    const tour = Object.create(Tour);
    tour.title = body.title;
    tour.description = body.description;
    tour.destination = body.destination;
    tour.categori = body.categori;
    tour.price = body.price;
    tour.nDays = body.nDays;
    tour.startDate = body.startDate;
    tour.endDate = body.endDate;
    tour.images = body.images;
    tour.itinerary = JSON.parse(body.itinerary);

    const tourRequest = await addTour(tour);
    res
      .status(201)
      .send({ message: "successfully created tour", value: tourRequest });
  } catch (err) {
    res.status(400).send({
      message: `failed operation. ${err}`,
    });
  }
}

async function getTours(req, res) {
  const tour = await getAllTours();
  res.status(200).send({ value: tour });
}

module.exports = {
  registerTour,
  getTours,
};
