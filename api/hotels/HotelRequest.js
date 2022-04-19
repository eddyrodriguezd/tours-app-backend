const DestinyService = require("../../services/DestinyService");

const buildHotelRequest = async ({
  checkIn,
  checkOut,
  rooms,
  adults,
  children,
  city,
}) => {
  const destiny = await DestinyService.find(city);
  console.log(destiny);
  if (destiny[0] === undefined) {
    throw new Error("Destination city not found");
  }

  return {
    stay: {
      checkIn: checkIn,
      checkOut: checkOut,
    },
    occupancies: [
      {
        rooms: rooms,
        adults: adults,
        children: children,
      },
    ],
    geolocation: {
      latitude: destiny[0].latitude,
      longitude: destiny[0].longitude,
      radius: 10,
      unit: "km",
    },
  };
};

module.exports = buildHotelRequest;
