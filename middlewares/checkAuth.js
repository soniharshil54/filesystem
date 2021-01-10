const {MESSAGE} = require('../configs/message')
const jwt = require('jsonwebtoken');
const jwtSecret = "asd"

module.exports = (req, res, next) => {
    try {
        const tokenRef = req.headers.authorization;
        const token = tokenRef.split(" ")[1]
        const decoded = jwt.verify(token, jwtSecret);
        // console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.unauthorized(null, MESSAGE.UNAUTHORIZED)
    }
};