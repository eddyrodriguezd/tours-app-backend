const Reservation = require('../model/reservation');
const reservations = [];

const moment = require('moment');

function registerReservation(req, res) {
    const { tourId, contactInfo, dateOfTravel, members, transport } = req.body;

    const reservation = Object.create(Reservation);
    reservation.tourId = tourId;
    reservation.contactInfo = contactInfo;
    reservation.dateOfTravel = dateOfTravel;
    reservation.members = members;
    reservation.transport = transport;
    reservation.createdAt = moment(new Date()).toString();

    reservations.push(reservation); //TODO: Change to DB saving

    console.log(`Reservation <${JSON.stringify(reservation)}> created`);
    res.status(200).send({ action: 'Reservation created', value: reservation })
}

function getReservationsByUser(req, res) {
    console.log('Called endpoint to retrieve all reservations from a user');

    res.status(200).send({ action: "Reservations retrieved", value: reservations })
}

module.exports = {
    registerReservation,
    getReservationsByUser
};