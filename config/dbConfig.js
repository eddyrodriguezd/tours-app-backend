const mongoose = require('mongoose');
const app = require('../index');
const port = process.env.PORT || 3977;

const dbPort = 27017;
mongoose.connect(process.env.DB_CONNECTION_STRING_URI, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    }
    else {
        console.log('Successfully connected to DB');
    }
});


