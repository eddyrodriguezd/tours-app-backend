const ReservationSchema = require('../models/Reservation');

const addReservation = ({ tour, startDate, endDate, members, hotel }, user) => {
    const contactInfo = {
        clientId: user._id.toString(),
        email: user.email,
        phone: user.phone
    }

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