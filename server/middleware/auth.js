const jwt = require('jsonwebtoken');
const config = require('../config/keys');

module.exports = function(req, res, next) {
    // Get the token from the header

    const token = req.header('x-auth-token');
    
    // Check if no token

    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, "configJwtSecrets")
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({message: 'Token is not valid'});
    }
}