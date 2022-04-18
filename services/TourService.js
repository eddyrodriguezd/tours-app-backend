const Tour = require("../models/Tour");

async function findTourModel(field, value) {
  try {
    /* preguntar que hace el corchete*/
    const query = { [field]: value };
    return await Tour.find(query);
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function addTour(tour) {
  try {        
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
  findTourModel,
};
