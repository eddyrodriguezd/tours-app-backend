const { Schema, model } = require("mongoose");

const Destiny = Schema({
  city: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

module.exports = model("Destiny", Destiny);
