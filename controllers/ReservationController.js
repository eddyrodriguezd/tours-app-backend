const ReservationService = require("../services/ReservationService");
const TourService = require("../services/TourService");
const mercadopago = require("mercadopago");
const validateError = require("../utils/validationErrorMP");

register = async (req, res) => {
  try {
    mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);
    const { info, ...payment } = req.body;
    mercadopago.payment
      .save(payment)
      .then(async function (response) {
        const { status, status_detail, i } = response.body;
        const { additional_info } = req.body;
        console.log(status, status_detail, i);
        if (status !== "approved") {
          res.status(400).send({ error: "Not approved" });
          return;
        }

        console.log("mercado");
        console.log(additional_info);
        console.log("fin mercadopago");
        TourService.findTourModel("id");
        const reservation = await ReservationService.addReservation(
          info,
          req.user
        );
        console.log(
          `Reservation with id = <${reservation._id}> successfully created`
        );
        res
          .status(201)
          .send({ action: "Reservation created", value: reservation });
      })
      .catch(function (error) {
        console.log(error);
        const { errorMessage, errorStatus } = validateError(error);
        res.status(errorStatus).json({ error: errorMessage });
      });
  } catch (err) {
    console.log("Reservation couldn't be processed", err);
    res
      .status(400)
      .send({ message: `Reservation couldn\'t be created. ${err}` });
  }
};

retrieveByUser = async (req, res) => {
  const reservations = await ReservationService.getReservationsByUser(req.user);

  res
    .status(200)
    .send({ action: "Reservations retrieved", value: reservations });
};

module.exports = {
  register,
  retrieveByUser,
};
