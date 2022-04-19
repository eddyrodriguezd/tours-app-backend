const ReservationSchema = require("../models/Reservation");
const { sendEmailTemplates } = require("../utils/sendEmail");

const addReservation = ({ tour, startDate, endDate, members, hotel }, user) => {
  const contactInfo = {
    clientId: user._id.toString(),
    email: user.email,
    phone: user.phone,
  };
  console.log(tour);
  console.log("te bailo sabroso");

  const reservation = new ReservationSchema({
    tour,
    contactInfo,
    startDate,
    endDate,
    members,
    hotel,
  });
  console.log(`Reservation <${JSON.stringify(reservation)}> received`);

  const reservationCreated = reservation.save();

  /*sendEmailTemplates({
        to: user.email,
        templateId: process.env.SENDGRID_TEMPLATE_RESERVATION_CONFIRMED_ID,
        dynamic_template_data: {
            clientName: user.name,
            city: reservation.tour.destination.city,
            startDate: reservation.startDate,
            endDate: reservation.endDate
        },
    });
*/
  return reservationCreated;
};

const getReservationsByUser = (user) => {
  return ReservationSchema.findByClientId(user.id);
};

module.exports = {
  addReservation,
  getReservationsByUser,
};
