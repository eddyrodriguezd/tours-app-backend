const Tour = require("../models/Tour");

async function addTour(tour) {
  try {
    console.log("servide");
    console.log(tour.itinerary);
    const tourAdd = await Tour.create(tour);
    return tourAdd;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getAllTours() {
  return await Tour.find();
}

module.exports = {
  addTour,
  getAllTours,
};
