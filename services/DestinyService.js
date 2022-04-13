const destiny = require("../models/Destiny");

const find = (city) => destiny.find({ city }).limit(1);

const create = async ({ city, latitude, longitude }) => {
  const destination = await find(city);
  if (
    destination.length > 0 &&
    destination[0].latitude === latitude &&
    destination[0].longitude === longitude
  ) {
    throw new Error("City duplicated");
  }
  destiny.create({ city, latitude, longitude });
};

const all = () => destiny.find();

const update = (_id, destination) => destiny.updateOne({ _id }, destination);

const remove = (_id) => destiny.deleteOne({ _id });

module.exports = { create, update, remove, find, all };
