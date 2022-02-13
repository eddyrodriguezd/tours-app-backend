const { Schema, model } = require('mongoose');

const ReservationSchema = Schema({
    tour: {
        tourId: { type: String, required: true },
        destination: {
            country: { type: String, required: true },
            city: { type: String, required: true },
        },
    },
    contactInfo: {
        clientId: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },

    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

    members: [{
        name: { type: String },
        lastName: { type: String },
        idType: { type: String },
        idNumber: { type: String },
    }],

    hotel: {
        name: { type: String },
        room: {
            category: { type: String },
            beds: { type: Number },
        },
        guests: { type: Number },
        price: {
            amount: { type: Number },
            currency: { type: String },
        }
    }
}, {
    timestamps: true
});

module.exports = model('Reservation', ReservationSchema);