const jwt = require('jwt-simple');
const moment = require('moment');

const { decodeToken } = require('../services/JwtService');

const secret = process.env.JWT_SECRET_KEY;

const checkAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Missing Authentication Token' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        const payload = decodeToken(token, secret);
        console.log('JWT Decoded: ', JSON.stringify(payload));

        if (payload.exp <= moment.unix()) {
            return res.status(403).send({ message: 'Token expired' });
        }

        req.user = payload;

    } catch (ex) {
        console.log('Exception while authenticating ', ex);
        return res.status(403).send({ message: 'Invalid Token' });
    }

    next();
};

module.exports = {
    checkAuth
};