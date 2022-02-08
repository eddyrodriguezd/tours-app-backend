const reservations = [];

const addReservation = (reservation, user) => {
    reservations.push(reservation); //TODO: Change to DB saving
};

const getReservationsByUser = (user) => {
    return reservations;
}

module.exports = {
    addReservation,
    getReservationsByUser
};