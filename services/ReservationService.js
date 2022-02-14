const ReservationSchema = require('../models/Reservation');

const addReservation = (reservation, user) => {
    return reservation.save();
};

const getReservationsByUser = (user) => {
    return ReservationSchema.findByClientId(user.id);
}

module.exports = {
    addReservation,
    getReservationsByUser
};