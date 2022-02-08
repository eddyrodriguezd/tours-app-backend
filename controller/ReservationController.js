const moment = require('moment');
const ReservationService = require('../services/ReservationService');
const Reservation = require('../model/Reservation');

function registerReservation(req, res) {
    const { tourId, contactInfo, dateOfTravel, members, transport } = req.body;

    const reservation = Object.create(Reservation);
    reservation.tourId = tourId;
    reservation.contactInfo = contactInfo;
    reservation.dateOfTravel = dateOfTravel;
    reservation.members = members;
    reservation.transport = transport;
    reservation.createdAt = moment(new Date()).toString();

    ReservationService.addReservation(reservation);

    console.log(`Reservation <${JSON.stringify(reservation)}> created`);
    res.status(200).send({ action: 'Reservation created', value: reservation })
}

function retrieveReservationsByUser(req, res) {
    const reservations = ReservationService.getReservationsByUser(req.user);

    res.status(200).send({ action: "Reservations retrieved", value: reservations })
}

module.exports = {
    registerReservation,
    retrieveReservationsByUser
};