const axios = require("axios")
const buildHotelRequest = require("../api/hotels/HotelRequest")
const hash = require("../utils/hash");
const HotelInfo = require("../api/hotels/response/HotelInfo");
const getMockHotelsInformation = require("../mock/mockHotels");

const getHotels = async ({ checkIn, checkOut, rooms, adults, children, city }) => {
    const payload = await buildHotelRequest({ checkIn, checkOut, rooms, adults, children, city });

    const url = process.env.HOTELS_API_URI.concat('/hotels');

    const config = {
        headers: {
            'Api-key': process.env.HOTELS_API_KEY,
            'X-Signature': hash(
                process.env.HOTELS_API_KEY
                    .concat(process.env.HOTELS_API_SECRET)
                    .concat(Math.trunc(new Date().getTime() / 1000))
            ),
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/json',
        }
    }

    let response;
    let hotels = [];

    try {
        if (process.env.HOTELS_MOCK === 'MOCK_TRUE') {
            hotels = getMockHotelsInformation();
        }
        else {
            response = await axios.post(url, payload, config);
            console.log('Number of available hotels:', response.data?.hotels.hotels?.length === undefined ? 0 : response.data?.hotels.hotels?.length);

            if (response.data?.hotels.hotels != null) {
                response.data?.hotels.hotels.map(hotel =>
                    hotels.push(
                        new HotelInfo(hotel)
                    )
                )
            }
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