const axios = require("axios")
const buildHotelRequest = require("../api/hotels/HotelRequest")
const hash = require("../utils/hash");
const HotelInfo = require("../api/hotels/response/HotelInfo");

const getHotels = async ({ checkIn, checkOut, rooms, adults, children, city }) => {
    const payload = buildHotelRequest({ checkIn, checkOut, rooms, adults, children, city });

    const url = process.env.HOTELS_API_URI.concat('/hotels');

    const config = {
        headers: {
            'Api-key': process.env.HOTELS_API_KEY,
            'X-Signature': hash(
                process.env.HOTELS_API_KEY
                .concat(process.env.HOTELS_API_SECRET)
                .concat(Math.trunc(new Date().getTime()/1000))
                ),
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/json',
        }
    }

    let response;
    try {
        response = await axios.post(url, payload, config);
        console.log('hotelsss', response.data?.hotels.hotels.length);

        const hotels = [];

        if(response.data?.hotels.hotels != null) {
            response.data?.hotels.hotels.map(hotel =>
                hotels.push(
                    new HotelInfo(hotel)
                )
            )
        }

        return hotels;
    }
    catch (err) {
        console.log('Error', err);
    }
}

module.exports = {
    getHotels
};