const buildHotelRequest = ({ checkIn, checkOut, rooms, adults, children, city }) => {
    //TODO: Get geolocation based on city information

    return {
        stay: {
            checkIn: checkIn,
            checkOut: checkOut
        },
        occupancies: [
            {
                rooms: rooms,
                adults: adults,
                children: children
            }
        ],
        geolocation: {
            latitude: -12.025810,
            longitude: -77.065840,
            radius: 10,
            unit: "km"
        }
    }
}

module.exports = buildHotelRequest;