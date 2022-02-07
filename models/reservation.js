const reservation = {
    tourId: String,
    contactInfo: {
        clientId: String,
        email: String,
        phoneNumber: String
    },
    dateOfTravel: String,
    members: [{
        name: String,
        lastName: String,
        idType: String,
        idNumber: String
    }],
    transport: {
        mean: String,
        startDestination: {
            country: String,
            state: String,
            city: String
        },
        endDestination: {
            country: String,
            state: String,
            city: String
        }
    },
    createdAt: String
}