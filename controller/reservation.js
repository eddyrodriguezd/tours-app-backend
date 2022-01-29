const Reservation = require('../model/reservation');
const reservations = [];

function registerReservation(req, res) {
    console.log('Called endpoint to register a reservation');
    const { tourId, contactInfo, members, transport } = req.body;

    const reservation = Object.create(Reservation);
    reservation.tourId = tourId;
    reservation.contactInfo = contactInfo;
    reservation.members = members;
    reservation.transport = transport;

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