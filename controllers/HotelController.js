const HotelService = require('../services/HotelService');

fetchByCity = async (req, res) => {
    try {
        const hotels = await HotelService.getHotels(req.body);        
        res.status(200).send({ action: 'Hotels fetched', value: hotels })
    }
    catch (err) {
        console.log('Hotels couldn\'t be fetched', err);
        res.status(400).send({ message: `Hotels couldn\'t be fetched. ${err}` })
    }
}

module.exports = {
    fetchByCity
};