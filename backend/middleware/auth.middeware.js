const jwt = require('jsonwebtoken');
const { env } = require('../configs/environment');
const { StatusCodes } = require('http-status-codes');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Access token required'
        });
    }

    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: 'Invalid or expired token'
            });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = { authenticateToken };