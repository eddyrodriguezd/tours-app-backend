const moment = require('moment');
const ReservationService = require('../services/ReservationService');
const ReservationSchema = require('../models/Reservation');

registerReservation = async (req, res) => {
    // TODO: Remove 'contactInfo' from body since it will be sent through the JWT
    const { tour, contactInfo, startDate, endDate, members, hotel } = req.body;
    const reservation = new ReservationSchema({ tour, contactInfo, startDate, endDate, members, hotel });
    console.log(`Reservation <${JSON.stringify(reservation)}> received`);

    try {
        const reservationCreated = await ReservationService.addReservation(reservation, null);
        console.log(`Reservation with id = <${reservationCreated._id}> successfully created`);
        res.status(200).send({ action: 'Reservation created', value: reservation })
    }
    catch (err) {
        res.status(400).send({ message: `Reservation couldn\'t be created. ${err}` })
    }
}

retrieveReservationsByUser = async (req, res) => {
    const reservations = await ReservationService.getReservationsByUser(req.user);

    res.status(200).send({ action: 'Reservations retrieved', value: reservations })
}

module.exports = {
    registerReservation,
    retrieveReservationsByUser
};