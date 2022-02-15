const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = Schema({
  title: String,
  description: String,
  destination: [],
  categori: [],
  price: mongoose.Decimal128,
  nDays: Number,
  startDate: Date,
  endDate: Date,
  images: [],
  itinerary: [
    {
      day: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Tour", tourSchema);
