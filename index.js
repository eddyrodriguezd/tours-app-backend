const app = require("./app");
require("dotenv").config({
  path: ".env",
});
const connectDatabase = require("./config/dbConfig");

/* const reservationRoutes=require("./routes/reservation");
app.use(`/api/reservation`, reservationRoutes);
*/
app.listen(process.env.PORT || 8080, () => {
  connectDatabase();
});

//Router
