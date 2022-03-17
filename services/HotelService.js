const axios = require("axios")
const buildHotelRequest = require("../api/hotels/HotelRequest")

const getHotels = async ({ checkIn, checkOut, rooms, adults, children, city }) => {
    const payload = buildHotelRequest({ checkIn, checkOut, rooms, adults, children, city });

    const url = process.env.HOTELS_API_URI.concat('/hotels');

    const config = {
        headers: {
            'Api-key': process.env.HOTELS_API_KEY,
            'X-Signature': process.env.HOTELS_API_SIGNATURE,
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/json',
        }
    }

    let response;
    try {
        response = await axios.post(url, payload, config);
        console.log('hotelsss', response.data?.hotels.hotels);
        return response.data?.hotels.hotels;
    }
    catch (err) {
        console.log('Error', err);
    }

    /*if (response.data.status === 200) {
        console.log('response from API', response.data?.hotels);
        return response.data?.hotels;
    }*/
}

module.exports = {
    getHotels
};