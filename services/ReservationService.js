const reservations = [];
const Reservation = require('../models/Reservation');

const addReservation = (reservation, user) => {
    return reservation.save();
};

const getReservationsByUser = (user) => {
    return reservations;
}

module.exports = {
    addReservation,
    getReservationsByUser
};