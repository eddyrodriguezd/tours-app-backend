const ReservationSchema = require('../models/Reservation');

const addReservation = ({ tour, contactInfo, startDate, endDate, members, hotel }, user) => {
    // TODO: Remove 'contactInfo' from body since it will be sent through the JWT
    const reservation = new ReservationSchema({ tour, contactInfo, startDate, endDate, members, hotel });
    console.log(`Reservation <${JSON.stringify(reservation)}> received`);
    return reservation.save();
};

const getReservationsByUser = (user) => {
    return ReservationSchema.findByClientId(user.id);
}

module.exports = {
    addReservation,
    getReservationsByUser
};