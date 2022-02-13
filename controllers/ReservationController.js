const moment = require('moment');
const ReservationService = require('../services/ReservationService');
const Reservation = require('../models/Reservation');

registerReservation = async (req, res) => {
    const { tourId, contactInfo, dateOfTravel, members, transport } = req.body;
    const reservation = new Reservation({ tourId, contactInfo, dateOfTravel, members, transport });
    console.log(`Reservation <${JSON.stringify(reservation)}> received`);

    const reservationCreated = await ReservationService.addReservation(reservation, null);

    console.log(`Reservation with id = <${reservationCreated._id}> successfully created`);
    res.status(200).send({ action: 'Reservation created', value: reservation })
}

retrieveReservationsByUser = async (req, res) => {
    const reservations = ReservationService.getReservationsByUser(req.user);

    res.status(200).send({ action: 'Reservations retrieved', value: reservations })
}

module.exports = {
    registerReservation,
    retrieveReservationsByUser
};