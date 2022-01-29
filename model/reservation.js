const reservation = {
    tourId: String,
    contactInfo: {
        clientId: String,
        email: String
    },
    members: [{
        name: String,
        lastName: String,
        idType: String,
        idNumber: String
    }],
    transport: {
        mean: String,
    }

}