const ReservationService = require('../services/ReservationService');

register = async (req, res) => {
    try {
        const reservation = await ReservationService.addReservation(req.body, null);
        console.log(`Reservation with id = <${reservation._id}> successfully created`);
        res.status(200).send({ action: 'Reservation created', value: reservation })
    }
    catch (err) {
        console.log('Reservation couldn\'t be processed', err);
        res.status(400).send({ message: `Reservation couldn\'t be created. ${err}` })
    }
}

retrieveByUser = async (req, res) => {
    const reservations = await ReservationService.getReservationsByUser(req.user);

    res.status(200).send({ action: 'Reservations retrieved', value: reservations })
}

module.exports = {
    register,
    retrieveByUser
};