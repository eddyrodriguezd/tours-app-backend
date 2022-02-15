const Tour = require("../models/Tour");

const mongoose = require("mongoose");
const connect =
  "mongodb+srv://alex:aventura123@cluster0.igmtw.mongodb.net/agenda";

mongoose
  .connect(connect)
  .then(() => {
    console.log("conectado");
  })
  .catch((err) => console.error(err));

async function addTour(tour) {
  try {
    console.log("servide");
    console.log(tour);
    const tourAdd = await Tour.create(tour);
    //return tourAdd;
    // res.status(200).json(tourAdd);
  } catch (err) {
    console.log(err);
    // res.status(400).json({ error: err });
  }
}

/* const getAllTours = () => {
  return reservations;
}; */

module.exports = {
  addTour,
};
