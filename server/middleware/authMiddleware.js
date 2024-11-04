const JWT = require('jsonwebtoken')
const HttpError = require('../models/errorModel')

const authMiddleware = async (req, res, next) => {
    const Authorization = req.headers.authorization || req.headers.athorization;

    if(Authorization && Authorization.startsWith("Bearer")) {
        const token = Authorization.split(' ')[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, info) => {
            if(err) {
                return next(new HttpError("Unathorized. Invalid Token", 403))
            }
            req.user = info;
            next()
        })
    } else {
        return next(new HttpError("Unathorized. No token", 402))
    }
}

module.exports = authMiddleware