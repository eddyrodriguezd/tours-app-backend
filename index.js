const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

//Load routes
const reservationRoutes = require('./routers/reservation');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log('App listening on port 8080!')
});

//Router
app.use(`/api/reservation`, reservationRoutes);

module.exports = app;