const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  destination: { type: String, required: true },
  categori: { type: String, required: true },
  price: { type: mongoose.Decimal128, required: true },
  nDays: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  images: [],
  itinerary: [
    {
      day: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Tour", tourSchema);
